import { Product } from "../../../../domain/product/entity/product.entity";
import { ProductRepositoryInterface } from "../../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto } from "../dto/find-product.dto";
import { FindProductUseCase } from "../find-product.usecase";

describe("Unit tests Product usecase", () => {
    let productRepository: jest.Mocked<ProductRepositoryInterface>
    beforeEach(() => {
        productRepository = {
            create: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn()
        };
    });

    it("should find a product", async () => {
        const product = new Product("1", "P1", 10);
        productRepository.find.mockReturnValue(Promise.resolve(product));

        const usecase = new FindProductUseCase(productRepository)
        const input: InputFindProductDto = { id: "1" };
        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: product.id,
            name: product.name,
            price: product.price
        });
    });

    it("should error not found product", async () => {
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found")
        });

        const usecase = new FindProductUseCase(productRepository)
        const input: InputFindProductDto = { id: "not exists" };

        expect(async () => {
            const output = await usecase.execute(input);
        }).rejects.toThrow("Product not found");
    });
});