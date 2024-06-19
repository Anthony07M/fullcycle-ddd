import { Sequelize } from "sequelize-typescript";
import { Product } from "../../../../domain/product/entity/product.entity";
import { ProductRepositoryInterface } from "../../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto } from "../dto/find-product.dto";
import { FindProductUseCase } from "../find-product.usecase";
import { ProductModel } from "../../../../infra/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../../infra/product/repository/sequelize/product.repository";

describe("Unit tests Product usecase", () => {
    let sequelize: Sequelize;
    let productRepository: ProductRepositoryInterface;
    let usecase: FindProductUseCase;

  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([ProductModel]);
      await sequelize.sync();
  
      productRepository = new ProductRepository();
      usecase = new FindProductUseCase(productRepository);
    });
  
    afterEach(async () => {
      await sequelize.close();
    });

    it("should find a product", async () => {
        const product = new Product("1", "P1", 10);

        await productRepository.create(product);

        const input: InputFindProductDto = { id: "1" };
        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: product.id,
            name: product.name,
            price: product.price
        });
    });
 
});