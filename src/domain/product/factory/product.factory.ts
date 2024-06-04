import { ProductB } from "../entity/product-b.entity";
import { Product } from "../entity/product.entity";
import { ProductInterface } from "../entity/product.interface";
import { randomUUID as uuid } from 'crypto'

export class ProductFactory {
    static create(type: string, name: string, price: number): ProductInterface {
        switch(type) {
            case "a" :
                return new Product(uuid(), name, price);
            case "b" :
                return new ProductB(uuid(), name, price);
            default:
                throw new Error("Product type not supported")
        }
    }
}