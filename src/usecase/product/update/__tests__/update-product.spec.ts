import { Product } from "../../../../domain/product/entity/product.entity";
import { ProductRepositoryInterface } from "../../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto } from "../dto/update-product.dto";
import { UpdateProductUseCase } from "../update-product.usecase";

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

    it("should update a product ", async () => {
        const usecase = new UpdateProductUseCase(productRepository);

        const input: InputUpdateProductDto = {
            id: "1",
            name: "P1 updated",
            price: 10
        }
        const output = await usecase.execute(input);

        expect(output).toEqual(input);
    });
});