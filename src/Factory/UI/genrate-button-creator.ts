import { Creator } from "../abstract-crator";
import { Product } from "Factory/product-inteerface";
import { GenerateButtonProduct } from "./generate-button-product";

export class GenerateButtonCreator extends Creator {

    public factoryMethod(): Product {
        return new GenerateButtonProduct();
    }
}