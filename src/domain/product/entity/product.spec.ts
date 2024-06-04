import { Product } from "./product.entity";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 25.58);
    }).toThrow("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("123", "", 25.58);
    }).toThrow("name is required");
  });

  it("should throw error when price then 0", () => {
    expect(() => {
      const product = new Product("123", "Product 1", 0);
    }).toThrow("price must be greater than 0");
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 12);
    const newProductName = "Product updated";

    product.changeName(newProductName);

    expect(product.name).toEqual(newProductName);
  });

  it("should throw error when price 0", () => {
    const product = new Product("123", "Product 1", 12);
    const invalidPrice = 0;

    expect(() => {
      product.changePrice(invalidPrice);
    }).toThrow("price must be greater than 0");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 12);
    const validPrice = 10;

    product.changePrice(validPrice);

    expect(product.price).toEqual(validPrice);
  });
});
