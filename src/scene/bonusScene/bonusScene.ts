import CONSTANTS from "../../constants/constants";
import * as PIXI from "pixi.js";
import { AbstractGameScene, SceneState } from "../scene";
import { WinMachine } from "../../engine/winMachine";

const CURRENT_LANGAUGE = 'en';
const LOCALS = CONSTANTS.LOCALS[ CURRENT_LANGAUGE || CONSTANTS.DEFAULT_LANGAUGE ];

export class BonusScene extends AbstractGameScene {
    private titleText: PIXI.Text;
    private youWinText: PIXI.Text;
    private winAmountText: PIXI.Text;
    private showCounter: number = 0;
    private WIDTH: number;
    private HEIGHT: number;

    constructor(app: PIXI.Application) {
        super(app);

        this.WIDTH = app.screen.width;
        this.HEIGHT = app.screen.height;

        this.titleText = new PIXI.Text(LOCALS.BONUS_TITLE, CONSTANTS.BUTTON_PLAY_STYLE_ENABLE);
        this.titleText.x = Math.round((this.WIDTH - this.titleText.width) / 2);
        this.titleText.y = Math.round(this.HEIGHT / 4);

        this.youWinText = new PIXI.Text(LOCALS.WIN_BONUS, CONSTANTS.BUTTON_PLAY_STYLE_ENABLE);
        this.youWinText.x = Math.round((this.WIDTH - this.youWinText.width) / 2);
        this.youWinText.y = Math.round(2 * this.HEIGHT / 4);

        this.winAmountText = new PIXI.Text(LOCALS.WIN_AMOUNT, CONSTANTS.BUTTON_PLAY_STYLE_ENABLE);
        this.winAmountText.x = Math.round((this.WIDTH - this.winAmountText.width) / 2);
        this.winAmountText.y = Math.round(3 * this.HEIGHT / 4);
    }

    setup(sceneContainer: PIXI.Container) {
        this.sceneContainer = sceneContainer;
        this.sceneState = SceneState.LOAD;

        this.refresh();

        sceneContainer.addChild(this.titleText);
        sceneContainer.addChild(this.youWinText);
        sceneContainer.addChild(this.winAmountText);
    }

    refresh() {
        this.winAmountText.text = LOCALS.WIN_AMOUNT + ' ' + WinMachine.getCurrentResult().chestBonusWin + '$';
    }

    preTransitionUpdate(delta: number) {
        this.refresh();
    }

    sceneUpdate(delta: number) {
        this.showCounter++;
        // console.log(this.showCounter);
        if (this.showCounter > 200) {
            this.showCounter = 0;
            this.sceneSwitcher("mainScene");
        }
    }
}