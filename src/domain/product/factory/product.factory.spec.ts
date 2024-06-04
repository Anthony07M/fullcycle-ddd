import { ProductFactory } from "./product.factory";

describe("Unit test product factory", () => {
    it("should create a product type a", () => {
        const product = ProductFactory.create("a", "Product A",  1);

        expect(product.id).toBeDefined();
        expect(product.name).toEqual("Product A");
        expect(product.price).toEqual(1);
        expect(product.constructor.name).toEqual("Product")
    });
    
    it("should create a product type b", () => {
        const product = ProductFactory.create("b", "Product B", 1);

        expect(product.id).toBeDefined();
        expect(product.name).toEqual("Product B");
        expect(product.price).toEqual(1);
        expect(product.constructor.name).toEqual("ProductB")
    });

    it("should throw an error when product type is not supported", () => {
        expect(() => {
            const product = ProductFactory.create("c", "Product", 1);
        }).toThrow("Product type not supported")
    });
});