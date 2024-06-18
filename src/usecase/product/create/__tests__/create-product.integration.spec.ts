import { Sequelize } from "sequelize-typescript";
import { ProductRepositoryInterface } from "../../../../domain/product/repository/product-repository.interface";
import { CreateProductUseCase } from "../create-product.usecase";
import { InputCreateProductDto } from "../dto/create-product.dto";
import { ProductModel } from "../../../../infra/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../../infra/product/repository/sequelize/product.repository";

describe("Test integration Product usecase", () => {
  let sequelize: Sequelize;
  let productRepository: ProductRepositoryInterface;
  let usecase: CreateProductUseCase;

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
    usecase = new CreateProductUseCase(productRepository);
  });

  afterEach(async () => {
    await sequelize.close();
  });
  
  it("should create a product", async () => {
    const input: InputCreateProductDto = {
      name: "p1",
      price: 10,
    };

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should thow error name is required", async () => {
    const usecase = new CreateProductUseCase(productRepository);
    const input: InputCreateProductDto = {
      name: "",
      price: 10,
    };

    expect(async () => {
      const result = await usecase.execute(input);
    }).rejects.toThrow("name is required");
  });

  it("should thow error price must be greater than 0", async () => {
    const usecase = new CreateProductUseCase(productRepository);
    const input: InputCreateProductDto = {
      name: "P1",
      price: -10,
    };

    expect(async () => {
      const result = await usecase.execute(input);
    }).rejects.toThrow("price must be greater than 0");
  });
});
