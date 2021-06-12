import CONSTANTS from "../../constants/constants";
import * as PIXI from "pixi.js";
import { AbstractGameScene, SceneState } from "../scene";
import { WinMachine } from "../../engine/winMachine";
const CURRENT_LANGAUGE = 'en';
const LOCALS = CONSTANTS.LOCALS[ CURRENT_LANGAUGE || CONSTANTS.DEFAULT_LANGAUGE ];
const CHEST_HEIGHT = 150;
const NUM_CHESTS = 6;


export class MainScene extends AbstractGameScene {
    private playBtn: PIXI.Graphics;
    private playText: PIXI.Text;
    private chests: PIXI.Graphics[];
    private chestsText: PIXI.Text[];

    private isPlaying: boolean;
    private WIDTH: number;
    private HEIGHT: number;

    constructor(app: PIXI.Application) {
        super(app);

        this.isPlaying = false;

        this.WIDTH = app.screen.width;
        this.HEIGHT = app.screen.height;

        this.chests = [];
        this.chestsText = [];
        // TODO: get these numbers from constants
        for (let i = 0; i < NUM_CHESTS; i++) {
            this.chests.push(new PIXI.Graphics());
            this.chests[ i ].interactive = false;
            this.chests[ i ].beginFill(0xCCCCCC, 1);
            this.chests[ i ].drawRect(
                (i + 1) % 2 ? Math.round(this.WIDTH / 2) : 0,
                (i + 1) % 2 ? Math.round(CHEST_HEIGHT * (i + 1) / 2) : Math.round(CHEST_HEIGHT * i / 2),
                Math.round(this.WIDTH / 2) - 1,
                CHEST_HEIGHT - 1
            );
            this.chestsText.push(new PIXI.Text(LOCALS.CHEST, CONSTANTS.BUTTON_PLAY_STYLE_DISABLE));
            this.chestsText[ i ].x = ((i + 1) % 2 ? Math.round(this.WIDTH / 2) : 0) + Math.round((this.chests[ i ].width - this.chestsText[ i ].width) / 2);
            this.chestsText[ i ].y = ((i + 1) % 2 ? Math.round(CHEST_HEIGHT * (i + 1) / 2) : Math.round(CHEST_HEIGHT * i / 2)) + Math.round((this.chests[ i ].height - this.chestsText[ i ].height) / 2);
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
        this.isPlaying = false;
        this.playBtn.interactive = true;
        sceneContainer.addChild(this.playBtn);

        for (let i = 0; i < this.chests.length; i++) {
            sceneContainer.addChild(this.chests[ i ]);
            this.chests[ i ].interactive = false;
            this.chests[ i ].buttonMode = true;
            this.chests[ i ].addListener("pointerup", () => {
                if (this.isPlaying) {
                    // this.isPlaying = false;
                    this.chests[ i ].interactive = false;
                    this.chests[ i ].beginFill(0xCCCCCC, 1);
                    this.chests[ i ].drawRect(
                        (i + 1) % 2 ? Math.round(this.WIDTH / 2) : 0,
                        (i + 1) % 2 ? Math.round(CHEST_HEIGHT * (i + 1) / 2) : Math.round(CHEST_HEIGHT * i / 2),
                        Math.round(this.WIDTH / 2) - 1,
                        CHEST_HEIGHT - 1);
                    this.chestsText[ i ].style = CONSTANTS.BUTTON_PLAY_STYLE_DISABLE;
                    let win = WinMachine.playChestRound();
                    this.chestsText[ i ].text = win.chestTotalWin.toString();
                    // this.sceneSwitcher("bonusScene");
                    console.error(win);
                }
            });
            this.chests[ i ].addListener("pointerover", () => {
                if (this.isPlaying) {
                    this.chests[ i ].beginFill(0xFFFFFF, 1);
                    this.chests[ i ].drawRect(
                        (i + 1) % 2 ? Math.round(this.WIDTH / 2) : 0,
                        (i + 1) % 2 ? Math.round(CHEST_HEIGHT * (i + 1) / 2) : Math.round(CHEST_HEIGHT * i / 2),
                        Math.round(this.WIDTH / 2) - 1,
                        CHEST_HEIGHT - 1);
                    this.chestsText[ i ].style = CONSTANTS.BUTTON_PLAY_STYLE_HOVER;
                }
            });
            this.chests[ i ].addListener("pointerout", () => {
                if (this.isPlaying) {
                    this.chests[ i ].beginFill(0x000000, 1);
                    this.chests[ i ].drawRect(
                        (i + 1) % 2 ? Math.round(this.WIDTH / 2) : 0,
                        (i + 1) % 2 ? Math.round(CHEST_HEIGHT * (i + 1) / 2) : Math.round(CHEST_HEIGHT * i / 2),
                        Math.round(this.WIDTH / 2) - 1,
                        CHEST_HEIGHT - 1);
                    this.chestsText[ i ].style = CONSTANTS.BUTTON_PLAY_STYLE_ENABLE;
                }
            });
        }



        this.playBtn.addListener("pointerup", () => {
            this.playText.style = CONSTANTS.BUTTON_PLAY_STYLE_DISABLE;
            this.playBtn.beginFill(0xCCCCCC, 1);
            this.playBtn.drawRect(0, this.HEIGHT - CHEST_HEIGHT, this.WIDTH, CHEST_HEIGHT);
            this.isPlaying = true;
            this.playBtn.interactive = false;
            for (let i = 0; i < this.chests.length; i++) {
                this.chests[ i ].interactive = true;
                this.chests[ i ].beginFill(0x000000, 1);
                this.chests[ i ].drawRect(
                    (i + 1) % 2 ? Math.round(this.WIDTH / 2) : 0,
                    (i + 1) % 2 ? Math.round(CHEST_HEIGHT * (i + 1) / 2) : Math.round(CHEST_HEIGHT * i / 2),
                    Math.round(this.WIDTH / 2) - 1,
                    CHEST_HEIGHT - 1
                );
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

    preTransitionUpdate(delta: number) {
        // this.melon.rotation += 0.1 * delta;
    }

    sceneUpdate(delta: number) {
        // this.melon.rotation += 0.1 * delta;
    }
}