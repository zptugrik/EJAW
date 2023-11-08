import { Creator } from "../abstract-crator";
import { Product } from "../product-inteerface";
import { SymbolProduct } from "./symbol-product";

export class SymbolCreator extends Creator {
    private color: string = 'black';

    constructor (color: string) {
        super();
        this.color = color;
    }
    /**
     * Note that the signature of the method still uses the abstract product
     * type, even though the concrete product is actually returned from the
     * method. This way the Creator can stay independent of concrete product
     * classes.
     */
    public factoryMethod(): Product {
        return new SymbolProduct(this.color);
    }
}