"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbolCreator = void 0;
const abstract_crator_1 = require("./abstract-crator");
const symbol_product_1 = require("./symbol-product");
class SymbolCreator extends abstract_crator_1.Creator {
    constructor() {
        super(...arguments);
        this.color = 'black';
    }
    execute(color) {
        this.color = color;
    }
    /**
     * Note that the signature of the method still uses the abstract product
     * type, even though the concrete product is actually returned from the
     * method. This way the Creator can stay independent of concrete product
     * classes.
     */
    factoryMethod() {
        return new symbol_product_1.SymbolProduct(this.color);
    }
}
exports.SymbolCreator = SymbolCreator;
//# sourceMappingURL=symbol-creator.js.map