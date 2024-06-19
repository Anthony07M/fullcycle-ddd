import { Sequelize } from "sequelize-typescript";
import { Product } from "../../../../domain/product/entity/product.entity";
import { ProductRepositoryInterface } from "../../../../domain/product/repository/product-repository.interface";
import { ProductModel } from "../../../../infra/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../../infra/product/repository/sequelize/product.repository";
import { InputListProductsDto } from "../dto /list-products.dto";
import { ListProductsUseCase } from "../list-products.usecase";

describe("Unit tests Product usecase", () => {
  let sequelize: Sequelize;
  let productRepository: ProductRepositoryInterface;
  let usecase: ListProductsUseCase;

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
    usecase = new ListProductsUseCase(productRepository);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list all products", async () => {
    const product1 = new Product("1", "P1", 10);
    const product2 = new Product("2", "P2", 20);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const input: InputListProductsDto = {};
    const output = await usecase.execute(input);

    expect(output.products[0]).toEqual({
      id: product1.id,
      name: product1.name,
      price: product1.price,
    });

    expect(output.products[1]).toEqual({
      id: product2.id,
      name: product2.name,
      price: product2.price,
    });
  });
});
