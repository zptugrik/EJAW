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


export class MainScene extends AbstractGameScene {
    private playBtn: PIXI.Graphics;
    private playText: PIXI.Text = new PIXI.Text('');
    private chests: PIXI.Graphics[] = [];
    private chestsText: PIXI.Text[] = [];

    private activatedChests: number;

    private isPlaying: boolean;
    private WIDTH: number;
    private HEIGHT: number;

    private chestsModel: ChestModel[] = [];

    private currentWinChest: PIXI.Text = new PIXI.Text('');

    constructor(app: PIXI.Application) {
        super(app);

        this.activatedChests = 0;
        this.isPlaying = false;

        this.WIDTH = app.screen.width;
        this.HEIGHT = app.screen.height;

        for (let i = 0; i < NUM_CHESTS; i++) {
            this.chests.push(new PIXI.Graphics());
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
            this.chests[ i ].interactive = this.chestsModel[ i ].interactive;
            this.chests[ i ].beginFill(0xCCCCCC, 1);
            this.drawButton(i);
            this.chestsText.push(new PIXI.Text(LOCALS.CHEST, CONSTANTS.BUTTON_PLAY_STYLE_DISABLE));

            this.chestsText[ i ].x = this.chestsModel[ i ].position.x + Math.round((this.chestsModel[ i ].size.width - this.chestsText[ i ].width) / 2);
            this.chestsText[ i ].y = this.chestsModel[ i ].position.y + Math.round((this.chestsModel[ i ].size.height - this.chestsText[ i ].height) / 2);
            this.chests[ i ].addChild(this.chestsText[ this.chestsText.length - 1 ]);
        }

        this.playBtn = new PIXI.Graphics();
        this.playBtn.interactive = true;
        this.playBtn.buttonMode = true;
        this.playBtn.beginFill(0x000000, 1);
        this.playBtn.drawRect(0, this.HEIGHT - CHEST_HEIGHT, this.WIDTH, CHEST_HEIGHT);
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
        this.activatedChests = 0;

        this.isPlaying = false;
        this.playBtn.interactive = true;
        this.playBtn.beginFill(0x000000, 1);
        this.playBtn.drawRect(0, this.HEIGHT - CHEST_HEIGHT, this.WIDTH, CHEST_HEIGHT);
        this.playText.style = CONSTANTS.BUTTON_PLAY_STYLE_ENABLE;
        this.sceneContainer.addChild(this.playBtn);

        for (let i = 0; i < this.chests.length; i++) {
            this.chestsModel[ i ].activated = false;
            this.chestsModel[ i ].interactive = false;
            this.chests[ i ].interactive = false;
            this.chests[ i ].buttonMode = true;

            this.chests[ i ].beginFill(0xCCCCCC, 1);
            this.drawButton(i);
            this.chestsText[ i ].text = LOCALS.CHEST;

            this.sceneContainer.addChild(this.chests[ i ]);
        }

        this.addAllListeners();
    }

    resetToCurrent() {
        for (let i = 0; i < this.chests.length; i++) {
            if (this.chestsModel[ i ].activated) {
                this.chests[ i ].interactive = false;
                this.chests[ i ].beginFill(0xCCCCCC, 1);
                this.drawButton(i);
                this.chestsText[ i ].style = CONSTANTS.BUTTON_PLAY_STYLE_DISABLE;
            } else {
                this.chests[ i ].interactive = true;
                this.addChestListeners(i)
                this.chests[ i ].beginFill(0x000000, 1);
                this.drawButton(i);
                this.chestsText[ i ].style = CONSTANTS.BUTTON_PLAY_STYLE_ENABLE;
            }
        }
        if (this.activatedChests > 5) {
            this.resetToBasic();
        }
    }

    addAllListeners() {
        for (let i = 0; i < this.chests.length; i++) {
            if (!this.chestsModel[ i ].activated) {
                this.addChestListeners(i);
            }
        }

        this.playBtn.addListener("pointerdown", () => {
            this.playText.style = CONSTANTS.BUTTON_PLAY_STYLE_DISABLE;
            this.playBtn.beginFill(0xCCCCCC, 1);
            this.playBtn.drawRect(0, this.HEIGHT - CHEST_HEIGHT, this.WIDTH, CHEST_HEIGHT);
            this.isPlaying = true;
            this.playBtn.interactive = false;
            for (let i = 0; i < this.chests.length; i++) {
                this.chests[ i ].interactive = true;
                this.chests[ i ].beginFill(0x000000, 1);
                this.drawButton(i);
                this.chestsText[ i ].style = CONSTANTS.BUTTON_PLAY_STYLE_ENABLE;
            }
        });
        this.playBtn.addListener("pointerover", () => {
            if (!this.isPlaying) {
                this.playBtn.beginFill(0xFFFFFF, 1);
                this.playBtn.drawRect(0, this.HEIGHT - CHEST_HEIGHT, this.WIDTH, CHEST_HEIGHT);
                this.playText.style = CONSTANTS.BUTTON_PLAY_STYLE_HOVER;
            }
        });
        this.playBtn.addListener("pointerout", () => {
            if (!this.isPlaying) {
                this.playBtn.beginFill(0x000000, 1);
                this.playBtn.drawRect(0, this.HEIGHT - CHEST_HEIGHT, this.WIDTH, CHEST_HEIGHT);
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
        this.removeAllListeners();
        for (let i = 0; i < this.chests.length; i++) {
            this.chests[ i ].interactive = false;
            this.chests[ i ].beginFill(0xCCCCCC, 1);
            this.drawButton(i);
            this.chestsText[ i ].style = CONSTANTS.BUTTON_PLAY_STYLE_DISABLE;
        };
    }

    addChestListeners(i: number) {
        this.chests[ i ].addListener("pointerdown", () => {
            if (this.isPlaying) {
                this.activatedChests++;
                this.chestsModel[ i ].activated = true;
                this.chests[ i ].interactive = false;
                this.chests[ i ].beginFill(0xCCCCCC, 1);
                this.drawButton(i);
                this.chestsText[ i ].style = CONSTANTS.BUTTON_PLAY_STYLE_DISABLE;
                const win = WinMachine.playChestRound();
                this.chestsText[ i ].text = win.chestTotalWin.toString();
                this.setChestsDisable();
                if (win.chestWin > 0) {
                    this.currentWinChest = this.chestsText[ i ];
                    this.sceneState = SceneState.PROCESS;
                } else {
                    this.resetToCurrent();
                }
                if (win.chestBonusWin > 0) {
                    this.chestsText[ i ].text = this.chestsText[ i ].text + ' + ' + LOCALS.BONUS_WIN;
                }
            }
        });
        this.chests[ i ].addListener("pointerover", () => {
            if (this.isPlaying) {
                this.chests[ i ].beginFill(0xFFFFFF, 1);
                this.drawButton(i);
                this.chestsText[ i ].style = CONSTANTS.BUTTON_PLAY_STYLE_HOVER;
            }
        });
        this.chests[ i ].addListener("pointerout", () => {
            if (this.isPlaying) {
                this.chests[ i ].beginFill(0x000000, 1);
                this.drawButton(i);
                this.chestsText[ i ].style = CONSTANTS.BUTTON_PLAY_STYLE_ENABLE;
            }
        });
    }

    drawButton(index: number) {
        this.chests[ index ].drawRect(
            this.chestsModel[ index ].position.x,
            this.chestsModel[ index ].position.y,
            this.chestsModel[ index ].size.width,
            this.chestsModel[ index ].size.height
        );
    }

    preTransitionUpdate(delta: number) {

    }

    sceneUpdate(delta: number) {
        if (this.currentWinChest.text === '') {
            return;
        };
        this.currentWinChest.rotation += 0.1 * delta;
        if (this.currentWinChest.rotation > Math.PI * 1.9) {
            this.currentWinChest.rotation = 0;
            this.currentWinChest = new PIXI.Text('');
            this.resetToCurrent();

            if (WinMachine.getCurrentResult().chestBonusWin > 0) {
                // this.sceneState = SceneState.FINALIZE;
                this.sceneSwitcher("bonusScene");
            }
        }
    }
}