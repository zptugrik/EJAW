import { Product } from "../Factory/product-inteerface";
import { Creator } from "../Factory/abstract-crator";
import { ConcreteProduct2 } from "./line-product";

class ConcreteCreator2 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct2();
    }
}