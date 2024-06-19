import { Sequelize } from "sequelize-typescript";
import { Product } from "../../../../domain/product/entity/product.entity";
import { ProductRepositoryInterface } from "../../../../domain/product/repository/product-repository.interface";
import { ProductModel } from "../../../../infra/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../../infra/product/repository/sequelize/product.repository";
import { InputUpdateProductDto } from "../dto/update-product.dto";
import { UpdateProductUseCase } from "../update-product.usecase";

describe("Unit tests Product usecase", () => {
  let sequelize: Sequelize;
  let productRepository: ProductRepositoryInterface;
  let usecase: UpdateProductUseCase;

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
    usecase = new UpdateProductUseCase(productRepository);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product ", async () => {
    const product = new Product("1", "P1", 10);
    await productRepository.create(product);

    const input: InputUpdateProductDto = {
      id: "1",
      name: "P1 updated",
      price: 10,
    };
    const output = await usecase.execute(input);
    expect(output).toEqual(input);
  });
});
