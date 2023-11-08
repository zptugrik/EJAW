import { Board } from "../Board/board";
import { GenerateButtonCreator } from "../Factory/UI/genrate-button-creator";
import { Application, Container, Text } from "pixi.js";

export class Ui {
    private uiContainer = new Container();
    public init(app: Application) {
        this.uiContainer.name = "uiContainer";
        app.stage.addChild(this.uiContainer);
        const button = new GenerateButtonCreator().addElement();
        this.uiContainer.addChild(button);

       // Create contents for the masked container
        let text = new Text(
            'GENERATE',
            {
            fontSize: 24,
            fill: 0xf0f0ff,
            wordWrap: true,
            wordWrapWidth: 180
            }
        );
        text.x = 35;
        text.y = 10;
        this.uiContainer.addChild(text);
        this.uiContainer.x = (window.innerWidth - this.uiContainer.width) / 2;
        this.uiContainer.y = (window.innerHeight - this.uiContainer.height) / 1.2;
    }
}