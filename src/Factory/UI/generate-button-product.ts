import { Config } from "../../Config/config";
import { Product } from "../product-inteerface";
import { Graphics, Rectangle } from "pixi.js";

export class GenerateButtonProduct implements Product {
    private color: string = 'black';
    public operation(): Graphics {
        var graphics = new Graphics();
        graphics.beginFill(this.color);
        graphics.drawRect(0, 0, 200, 50);
        graphics.name = "GenerateButton";
        graphics.interactive = true;
        return graphics;
    }
}