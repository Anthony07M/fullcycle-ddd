import { Sequelize } from "sequelize-typescript";
import { ProductRepository } from "./product.repository";
import { Product } from "../../domain/product/product.entity";
import { ProductModel } from "../database/sequelize/model/product.model";

describe("Product respository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 20);

    await productRepository.create(product);

    const productmodel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productmodel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 20,
    });
  });

  it("should update a product ", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 20);

    await productRepository.create(product);

    const productmodel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productmodel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 20,
    });

    product.changeName("Product new");
    product.changePrice(25);

    productRepository.update(product);

    const newProductmodel = await ProductModel.findOne({ where: { id: "1" } });

    expect(newProductmodel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product new",
      price: 25,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 20);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({
      where: { id: product.id },
    });
    const foundProduct = await productRepository.find("1");

    expect(productModel.toJSON()).toEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const productOne = new Product("1", "Product 1", 20);
    const productTwo = new Product("2", "Product 2", 40);

    await productRepository.create(productOne)
    await productRepository.create(productTwo)

    const foundProducts = await productRepository.findAll();
    const products = [ productOne, productTwo ];

    expect(products).toEqual(foundProducts);

  });

  afterEach(async () => {
    await sequelize.close();
  });
});
