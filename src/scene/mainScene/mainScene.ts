import CONSTANTS from "../../constants/constants";
import * as PIXI from "pixi.js";
import { AbstractGameScene, SceneState } from "../scene";
import { WinMachine } from "../../engine/winMachine";
const CURRENT_LANGAUGE = 'en';
const LOCALS = CONSTANTS.LOCALS[ CURRENT_LANGAUGE || CONSTANTS.DEFAULT_LANGAUGE ];
const CHEST_HEIGHT = 150;
const NUM_CHESTS = 6;

interface Position {
    x: number;
    y: number;
};

interface Size {
    width: number;
    height: number;
}

interface ChestModel {
    position: Position;
    size: Size;
    index: number;
    interactive: boolean;
    activated: boolean;
};

enum BUTTON_STATE {
    ENABLE,
    DISABLE,
    HOVER
}


export class MainScene extends AbstractGameScene {
    private playBtn: PIXI.Graphics;
    private playText: PIXI.Text = new PIXI.Text('');
    private chests: PIXI.Graphics[] = [];
    private chestsText: PIXI.Text[] = [];
    private chestsModel: ChestModel[] = [];

    private _activatedChests: number = 0;

    private set activatedChests(val: number) {
        this._activatedChests = val;
    }

    private get activatedChests() {
        this.activatedChests = this.chestsModel.filter(chest => {
            return chest.activated;
        }).length;

        return this._activatedChests;
    }

    private isPlaying: boolean = false;
    private WIDTH: number;
    private HEIGHT: number;

    private currentWinChest: PIXI.Text = new PIXI.Text('');

    constructor(app: PIXI.Application) {
        super(app);

        this.WIDTH = app.screen.width;
        this.HEIGHT = app.screen.height;

        for (let i = 0; i < NUM_CHESTS; i++) {
            this.chests.push(new PIXI.Graphics());
            this.chests[ i ].buttonMode = true;
            this.chestsModel.push({
                position: {
                    x: (i + 1) % 2 ? Math.round(this.WIDTH / 2) : 0,
                    y: (i + 1) % 2 ? Math.round(CHEST_HEIGHT * (i + 1) / 2) : Math.round(CHEST_HEIGHT * i / 2)
                },
                size: {
                    width: Math.round(this.WIDTH / 2) - 1,
                    height: CHEST_HEIGHT - 1
                },
                index: i,
                interactive: false,
                activated: false
            });

            this.chestsText.push(new PIXI.Text(LOCALS.CHEST, CONSTANTS.BUTTON_PLAY_STYLE_DISABLE));

            this.chestsText[ i ].x = this.chestsModel[ i ].position.x + Math.round((this.chestsModel[ i ].size.width - this.chestsText[ i ].width) / 2);
            this.chestsText[ i ].y = this.chestsModel[ i ].position.y + Math.round((this.chestsModel[ i ].size.height - this.chestsText[ i ].height) / 2);
            this.chests[ i ].addChild(this.chestsText[ this.chestsText.length - 1 ]);

            this.setChestState(i, BUTTON_STATE.DISABLE);
        }

        this.playBtn = new PIXI.Graphics();
        this.playBtn.interactive = true;
        this.playBtn.buttonMode = true;
        this.playBtn.beginFill(0x000000, 1);
        this.playBtn.drawRect(0, this.HEIGHT - CHEST_HEIGHT, this.WIDTH, CHEST_HEIGHT);
        this.playBtn.endFill();
        this.playText = new PIXI.Text(LOCALS.PLAY, CONSTANTS.BUTTON_PLAY_STYLE_ENABLE);
        this.playText.x = Math.round((this.playBtn.width - this.playText.width) / 2);
        this.playText.y = this.HEIGHT - Math.round((this.playBtn.height + (this.playText.height / 2)) / 2);
        this.playBtn.addChild(this.playText);
    }

    setup(sceneContainer: PIXI.Container) {
        this.sceneState = SceneState.LOAD;
        this.sceneContainer = sceneContainer;
        this.resetToBasic();
    }

    resetToBasic() {
        this.removeAllListeners();
        this.sceneContainer.removeChildren();

        this.isPlaying = false;
        this.playBtn.interactive = true;
        this.playBtn.beginFill(0x000000, 1);
        this.playBtn.drawRect(0, this.HEIGHT - CHEST_HEIGHT, this.WIDTH, CHEST_HEIGHT);
        this.playBtn.endFill();
        this.playText.style = CONSTANTS.BUTTON_PLAY_STYLE_ENABLE;
        this.sceneContainer.addChild(this.playBtn);

        for (let i = 0; i < this.chests.length; i++) {
            this.chestsModel[ i ].activated = false;
            this.chestsModel[ i ].interactive = false;

            this.setChestState(i, BUTTON_STATE.DISABLE);
            this.chestsText[ i ].text = LOCALS.CHEST;

            this.sceneContainer.addChild(this.chests[ i ]);
            this.refresh();
        }

        this.addAllListeners();
    }

    // TODO: this is unstable
    refresh() {
        if (this.isPlaying) {
            for (let i = 0; i < this.chests.length; i++) {
                if (this.chestsModel[ i ].activated) {
                    this.setChestState(i, BUTTON_STATE.DISABLE);
                } else {
                    this.removeChestListeners(i);
                    this.addChestListeners(i);
                    this.setChestState(i, BUTTON_STATE.ENABLE);
                }
            }
        }
    }

    addAllListeners() {
        this.removeAllListeners();

        for (let i = 0; i < this.chests.length; i++) {
            if (!this.chestsModel[ i ].activated) {
                this.addChestListeners(i);
            }
        }

        this.playBtn.addListener("pointerdown", () => {
            this.playText.style = CONSTANTS.BUTTON_PLAY_STYLE_DISABLE;
            this.playBtn.beginFill(0xCCCCCC, 1);
            this.playBtn.drawRect(0, this.HEIGHT - CHEST_HEIGHT, this.WIDTH, CHEST_HEIGHT);
            this.playBtn.endFill();
            this.isPlaying = true;
            this.playBtn.interactive = false;
            for (let i = 0; i < this.chests.length; i++) {
                this.chestsModel[ i ].activated = false;
                this.chestsModel[ i ].interactive = true;
                this.setChestState(i, BUTTON_STATE.ENABLE);
            }
        });
        this.playBtn.addListener("pointerover", () => {
            if (!this.isPlaying) {
                this.playBtn.beginFill(0xFFFFFF, 1);
                this.playBtn.drawRect(0, this.HEIGHT - CHEST_HEIGHT, this.WIDTH, CHEST_HEIGHT);
                this.playBtn.endFill();
                this.playText.style = CONSTANTS.BUTTON_PLAY_STYLE_HOVER;
            }
        });
        this.playBtn.addListener("pointerout", () => {
            if (!this.isPlaying) {
                this.playBtn.beginFill(0x000000, 1);
                this.playBtn.drawRect(0, this.HEIGHT - CHEST_HEIGHT, this.WIDTH, CHEST_HEIGHT);
                this.playBtn.endFill();
                this.playText.style = CONSTANTS.BUTTON_PLAY_STYLE_ENABLE;
            }
        });
    }

    removeAllListeners() {
        this.playBtn.removeAllListeners();
        for (let i = 0; i < this.chests.length; i++) {
            this.chests[ i ].removeAllListeners();
        }
    }

    setChestsDisable() {
        for (let i = 0; i < this.chests.length; i++) {
            this.chests[ i ].removeAllListeners();
            this.setChestState(i, BUTTON_STATE.DISABLE);
        };
    }

    removeChestListeners(index: number) {
        this.chests[ index ].removeAllListeners();
    }
    // TODO: this part is unstable
    addChestListeners(i: number) {
        this.chests[ i ].addListener("pointerdown", () => {
            this.chestsModel[ i ].activated = true;
            this.setChestState(i, BUTTON_STATE.DISABLE);
            const win = WinMachine.playChestRound();
            this.chestsText[ i ].text = win.chestTotalWin.toString();
            this.setChestsDisable();

            if (win.chestWin > 0) {
                this.currentWinChest = this.chestsText[ i ];
                this.sceneState = SceneState.PROCESS;
            } else {
                this.refresh();
            }

            if (win.chestBonusWin > 0) {
                this.chestsText[ i ].text = this.chestsText[ i ].text + ' + ' + LOCALS.BONUS_WIN;
            }
        });
        this.chests[ i ].addListener("pointerover", () => {
            this.setChestState(i, BUTTON_STATE.HOVER);
        });
        this.chests[ i ].addListener("pointerout", () => {
            this.setChestState(i, BUTTON_STATE.ENABLE);
        });
    }

    setChestState(index: number, state: BUTTON_STATE) {
        switch (state) {
            case BUTTON_STATE.ENABLE:
                this.drawButton(index, 0x000000);
                this.chestsText[ index ].style = CONSTANTS.BUTTON_PLAY_STYLE_ENABLE;
                this.chests[ index ].interactive = true;
                break;
            case BUTTON_STATE.DISABLE:
                this.drawButton(index, 0xCCCCCC);
                this.chestsText[ index ].style = CONSTANTS.BUTTON_PLAY_STYLE_DISABLE;
                this.chests[ index ].interactive = false;
                break;
            case BUTTON_STATE.HOVER:
                this.drawButton(index, 0xFFFFFF);
                this.chestsText[ index ].style = CONSTANTS.BUTTON_PLAY_STYLE_HOVER;
                break;
        }
    }

    drawButton(index: number, color: number) {
        this.chests[ index ].beginFill(color, 1);
        this.chests[ index ].drawRect(
            this.chestsModel[ index ].position.x,
            this.chestsModel[ index ].position.y,
            this.chestsModel[ index ].size.width,
            this.chestsModel[ index ].size.height
        );
        this.chests[ index ].endFill();
    }

    preTransitionUpdate(delta: number) {
        if (this.activatedChests >= this.chests.length) {
            this.resetToBasic();
        }
    }

    // TODO: refactore it
    sceneUpdate(delta: number) {
        if (this.currentWinChest.text === '' && this.activatedChests < this.chests.length) {
            return;
        };
        this.currentWinChest.rotation += 0.1 * delta;
        if (this.currentWinChest.rotation > Math.PI * 1.9) {
            this.currentWinChest.rotation = 0;
            this.currentWinChest = new PIXI.Text('');
            this.refresh();

            if (WinMachine.getCurrentResult().chestBonusWin > 0) {
                this.sceneSwitcher("bonusScene");
            }

            if (this.activatedChests >= this.chests.length) {
                this.resetToBasic();
            }
        }
    }
}