import { Product } from "../product/product.entity";

export class ProductService {
    static increasePrice(products: Product[], percentage: number) {
        products.forEach((product) => {
            const newPrice = product.price + (product.price * percentage / 100)
            product.changePrice(newPrice);
        })
    }
}