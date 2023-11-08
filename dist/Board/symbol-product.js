"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbolProduct = void 0;
const pixi_js_1 = require("pixi.js");
class SymbolProduct {
    constructor() {
        this.color = 'black';
    }
    execute(color) {
        this.color = color;
    }
    operation() {
        var graphics = new pixi_js_1.Graphics();
        graphics.beginFill(this.color);
        // set the line style to have a width of 5 and set the color to red
        graphics.lineStyle(5, 'magenta');
        // draw a rectangle
        graphics.drawRect(0, 0, 300, 200);
        return graphics;
    }
}
exports.SymbolProduct = SymbolProduct;
//# sourceMappingURL=symbol-product.js.map