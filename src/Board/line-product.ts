import { Config } from "../Config/config";
import { Product } from "Factory/product-inteerface";
import { Graphics } from "pixi.js";

export class ConcreteProduct2 implements Product {
    public operation(): Graphics {
        var graphics = new Graphics();
     //   graphics.beginFill(this.color);
        graphics.drawRect(0, 0, Config.SYMBOL_WIDTH, Config.SYMBOL_HEIGHT);
        return graphics;
    }
}