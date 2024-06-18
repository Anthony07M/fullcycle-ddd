import { Product } from "../../../../domain/product/entity/product.entity";
import { ProductRepositoryInterface } from "../../../../domain/product/repository/product-repository.interface";
import { InputListProductsDto } from "../dto /list-products.dto";
import { ListProductsUseCase } from "../list-products.usecase";

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
    it("should list all products", async () => {
        const product1 = new Product("1", "P1", 10);
        const product2 = new Product("2", "P2", 20);

        productRepository.findAll.mockReturnValue(Promise.resolve([product1, product2]));

        const usecase = new ListProductsUseCase(productRepository)
        const input: InputListProductsDto = {}

        const output = await usecase.execute(input);

        expect(output.products[0]).toEqual({
            id: product1.id,
            name: product1.name,
            price: product1.price
        })

        expect(output.products[1]).toEqual({
            id: product2.id,
            name: product2.name,
            price: product2.price
        })
    });
});