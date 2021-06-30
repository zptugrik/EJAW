import CONSTANTS, { BUTTON_STATE, ChestModel, SceneState } from "../../constants/constants";
import * as PIXI from "pixi.js";
import { AbstractGameScene } from "../scene";
import { WinMachine } from "../../engine/winMachine";

const CURRENT_LANGAUGE = 'en';
const LOCALS = CONSTANTS.LOCALS[ CURRENT_LANGAUGE || CONSTANTS.DEFAULT_LANGAUGE ];
const NUM_CHESTS = CONSTANTS.NUM_CHESTS;
const CHEST_HEIGHT = CONSTANTS.CHEST_HEIGHT;


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
                activated: false
            });

            this.chestsText.push(new PIXI.Text(LOCALS.CHEST, CONSTANTS.BUTTON_PLAY_STYLE_DISABLE));
            this.chestsText[ i ].anchor.set(0.5);
            this.chestsText[ i ].x = this.chestsModel[ i ].position.x + Math.round(this.chestsModel[ i ].size.width / 2);
            this.chestsText[ i ].y = this.chestsModel[ i ].position.y + Math.round(this.chestsModel[ i ].size.height / 2);
            this.chests[ i ].addChild(this.chestsText[ this.chestsText.length - 1 ]);

            this.drawButton(i, 0xCCCCCC);
            this.setChestState(i, BUTTON_STATE.DISABLE);
        }

        this.playBtn = new PIXI.Graphics();
        this.playBtn.buttonMode = true;
        this.setPlayState(BUTTON_STATE.ENABLE);
        this.playText = new PIXI.Text(LOCALS.PLAY, CONSTANTS.BUTTON_PLAY_STYLE_ENABLE);
        this.playText.x = Math.round((this.playBtn.width - this.playText.width) / 2);
        this.playText.y = this.HEIGHT - Math.round((this.playBtn.height + (this.playText.height / 2)) / 2);
        this.playBtn.addChild(this.playText);

        this.addAllListeners();
    }

    setup(sceneContainer: PIXI.Container) {
        this.sceneState = SceneState.LOAD;
        this.sceneContainer = sceneContainer;
        this.sceneContainer.addChild(this.playBtn);
        for (let i = 0; i < NUM_CHESTS; i++) {
            this.sceneContainer.addChild(this.chests[ i ]);
        }
        this.resetToBasic();
    }

    resetToBasic() {
        this.setPlayState(BUTTON_STATE.ENABLE);
        this.playText.style = CONSTANTS.BUTTON_PLAY_STYLE_ENABLE;

        for (let i = 0; i < NUM_CHESTS; i++) {
            this.chestsModel[ i ].activated = false;
            this.setChestState(i, BUTTON_STATE.DISABLE);
            this.chestsText[ i ].text = LOCALS.CHEST;
        }
    }

    refresh() {
        for (let i = 0; i < NUM_CHESTS; i++) {
            if (this.chestsModel[ i ].activated) {
                this.setChestState(i, BUTTON_STATE.DISABLE);
            } else {
                this.setChestState(i, BUTTON_STATE.ENABLE);
            }
        }
        this.currentWinChest = new PIXI.Text('');

        if (this.activatedChests >= NUM_CHESTS) {
            this.resetToBasic();
        }
    }

    addAllListeners() {
        for (let i = 0; i < this.chests.length; i++) {
            this.addChestListeners(i);
        }

        this.playBtn.addListener("pointerdown", () => {
            this.setPlayState(BUTTON_STATE.DISABLE);
            for (let i = 0; i < NUM_CHESTS; i++) {
                this.chestsModel[ i ].activated = false;
                this.setChestState(i, BUTTON_STATE.ENABLE);
            }
        });
        this.playBtn.addListener("pointerover", () => {
            this.setPlayState(BUTTON_STATE.HOVER);
        });
        this.playBtn.addListener("pointerout", () => {
            this.setPlayState(BUTTON_STATE.ENABLE);
        });
    }

    setChestsDisable() {
        for (let i = 0; i < NUM_CHESTS; i++) {
            this.setChestState(i, BUTTON_STATE.DISABLE);
        };
    }

    addChestListeners(i: number) {
        this.chests[ i ].addListener("pointerdown", () => {
            this.chestsModel[ i ].activated = true;

            // bring button on top
            this.sceneContainer.swapChildren(this.sceneContainer.getChildAt(this.sceneContainer.children.length - 1), this.chests[ i ]);
            this.sceneContainer.updateTransform();

            // call new round to recalculate results
            const win = WinMachine.playChestRound();

            this.chestsText[ i ].text = win.chestTotalWin.toString();

            // set all chest states to DISABLE
            this.setChestsDisable();

            // geting object for open / win / loose animation
            this.currentWinChest = this.chestsText[ i ];

            if (win.chestBonusWin > 0) {
                this.chestsText[ i ].text = this.chestsText[ i ].text + ' + ' + LOCALS.BONUS_WIN + ' ' + win.chestBonusWin.toString();
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
                this.chestsText[ index ].style = CONSTANTS.BUTTON_PLAY_STYLE_ENABLE;
                this.chests[ index ].interactive = true;
                break;
            case BUTTON_STATE.DISABLE:
                this.chestsText[ index ].style = CONSTANTS.BUTTON_PLAY_STYLE_DISABLE;
                this.chests[ index ].interactive = false;
                break;
            case BUTTON_STATE.HOVER:
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

    setPlayState(state: BUTTON_STATE) {
        switch (state) {
            case BUTTON_STATE.ENABLE:
                this.drawPlayButton(0x000000);
                this.playText.style = CONSTANTS.BUTTON_PLAY_STYLE_ENABLE;
                this.playBtn.interactive = true;
                break;
            case BUTTON_STATE.DISABLE:
                this.drawPlayButton(0xCCCCCC);
                this.playText.style = CONSTANTS.BUTTON_PLAY_STYLE_DISABLE;
                this.playBtn.interactive = false;
                break;
            case BUTTON_STATE.HOVER:
                this.drawPlayButton(0xFFFFFF);
                this.playText.style = CONSTANTS.BUTTON_PLAY_STYLE_HOVER;
                break;
        }
    }

    drawPlayButton(color: number) {
        this.playBtn.beginFill(color, 1);
        this.playBtn.drawRect(
            0,
            this.HEIGHT - CHEST_HEIGHT,
            this.WIDTH,
            CHEST_HEIGHT
        );
        this.playBtn.endFill();
    }

    preTransitionUpdate(delta: number) {

    }

    sceneUpdate(delta: number) {
        if (this.currentWinChest.text === '' && this.activatedChests < NUM_CHESTS) {
            return;
        }

        // rotation animation for opening chest / same for loose
        this.currentWinChest.rotation += 0.1 * delta;

        // scale animation if any win > 0
        if (this.currentWinChest.text !== '0') {
            this.currentWinChest.scale.set(this.currentWinChest.rotation / 4);
        }
        if (this.currentWinChest.rotation > Math.PI * 2) {
            this.currentWinChest.rotation = 0;
            this.currentWinChest.scale.set(1);

            this.currentWinChest = new PIXI.Text('');

            if (WinMachine.getCurrentResult().chestBonusWin > 0) {
                this.sceneSwitcher("bonusScene");
            } else if (this.activatedChests >= this.chests.length) {
                this.resetToBasic();
            } else {
                this.refresh();
            }
        }
    }
}