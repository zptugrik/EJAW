import { Graphics } from "pixi.js";
import { Product } from "../product-inteerface";
import { Config } from "../../Config/config";

export class SymbolProduct implements Product {
    private color: string = 'black';

    constructor (color: string) {
        this.color = color;
    }
    public operation(): Graphics {
        var graphics = new Graphics();
        graphics.beginFill(this.color);
        graphics.drawRect(0, 0, Config.SYMBOL_WIDTH, Config.SYMBOL_HEIGHT);
        return graphics;
    }
}