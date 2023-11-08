import { Graphics } from "pixi.js";
import { Product } from "./product-inteerface";

export abstract class Creator {
    /**
     * Note that the Creator may also provide some default implementation of the
     * factory method.
     */
    public abstract factoryMethod(): Product;

    // public someOperation(): string {
    //     // Call the factory method to create a Product object.
    //     const product = this.factoryMethod();
    //     // Now, use the product.
    //     return `Creator: The same creator's code has just worked with ${product.operation()}`;
    // }
    public addElement(): Graphics {
        // Call the factory method to create a Product object.
        const product = this.factoryMethod();
        // Now, use the product.
        return product.operation();
    }
}