import { SceneTransition, TransitionType } from "../constants/constants";
import * as PIXI from "pixi.js";



/**
 * Simple transition that can fade into/out of black.
 */
export class SimpleFadeTransition implements SceneTransition {
    private app: PIXI.Application;
    private type: TransitionType;
    private transitionSprite: PIXI.Sprite;
    private updateStep: number;

    constructor(app: PIXI.Application, updateStep: number = 0.01, type: TransitionType) {
        this.app = app;
        this.updateStep = updateStep;
        this.type = type;

        const graphics = new PIXI.Graphics();
        graphics.beginFill(0x000000);
        graphics.drawRect(0, 0, this.app.renderer.width, this.app.renderer.height);
        graphics.endFill();
        this.transitionSprite = new PIXI.Sprite(this.app.renderer.generateTexture(graphics, 1, 1));
    }

    init(sceneContainer: PIXI.Container, type: TransitionType) {
        this.type = type;
        this.createTransitionSprite(this.type);
        sceneContainer.addChild(this.transitionSprite);
    }

    private createTransitionSprite(type: TransitionType) {
        const alpha = type === TransitionType.FADE_OUT ? 1 : 0;
        this.transitionSprite.alpha = alpha;
    }

    update(delta: number, callback: () => void) {
        switch (this.type) {
            case TransitionType.FADE_OUT:
                if (this.transitionSprite.alpha > 0) {
                    this.transitionSprite.alpha -= this.updateStep * delta;
                } else {
                    this.transitionSprite.alpha = 0;
                    callback();
                }
                break;

            case TransitionType.FADE_IN:
                if (this.transitionSprite.alpha < 1) {
                    this.transitionSprite.alpha += this.updateStep * delta;
                } else {
                    this.transitionSprite.alpha = 1;
                    callback();
                }
                break;
        }
    }
}