import { ProductRepositoryInterface } from "../../../../domain/product/repository/product-repository.interface";
import { CreateProductUseCase } from "../create-product.usecase";
import { InputCreateProductDto } from "../dto/create-product.dto";

describe("Unit tests Product usecase", () => {
    let productRepository: jest.Mocked<ProductRepositoryInterface>
    beforeEach(() => {
        productRepository = {
            create: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn()
        }
    });

    it("should create a product", async () => {
        const usecase = new CreateProductUseCase(productRepository);
        const input: InputCreateProductDto = {
            name: "p1",
            price: 10
        };

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        })
    });

    it("should thow error name is required", async () => {
        const usecase = new CreateProductUseCase(productRepository);
        const input: InputCreateProductDto = {
            name: "",
            price: 10
        };

        expect(async () => {
            const result = await usecase.execute(input);
        }).rejects.toThrow("name is required");
    });

    it("should thow error price must be greater than 0", async () => {
        const usecase = new CreateProductUseCase(productRepository);
        const input: InputCreateProductDto = {
            name: "P1",
            price: -10
        };

        expect(async () => {
            const result = await usecase.execute(input);
        }).rejects.toThrow("price must be greater than 0");
    });
});