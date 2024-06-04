import { Product } from "../product/product.entity";
import { ProductService } from "./product.service";

describe("Unit tess Order service", () => {
  it("should change the prices of all products", () => {
    const product1 = new Product("123", "Product 1", 10);
    const product2 = new Product("321", "Product 2", 15);

    const products = [ product1, product2 ];

    ProductService.increasePrice(products, 100);

    expect(product1.price).toEqual(20)
    expect(product2.price).toEqual(30)

  });
});
