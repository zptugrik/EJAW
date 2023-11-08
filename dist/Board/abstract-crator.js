"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Creator = void 0;
class Creator {
    // public someOperation(): string {
    //     // Call the factory method to create a Product object.
    //     const product = this.factoryMethod();
    //     // Now, use the product.
    //     return `Creator: The same creator's code has just worked with ${product.operation()}`;
    // }
    addElement() {
        // Call the factory method to create a Product object.
        const product = this.factoryMethod();
        // Now, use the product.
        return product.operation();
    }
}
exports.Creator = Creator;
//# sourceMappingURL=abstract-crator.js.map