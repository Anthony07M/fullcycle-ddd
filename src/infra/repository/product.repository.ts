import { Product } from "../../domain/product/entity/product.entity";
import { ProductRepositoryInterface } from "../../domain/product/repository/product-repository.interface";
import { ProductModel } from "../database/sequelize/model/product.model";

export class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      { where: { id: entity.id } }
    );
  }

  async find(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({ where: { id } });

    return new Product(productModel.id, productModel.name, productModel.price);
  }

  async findAll(): Promise<Product[]> {
    const productsModel = await ProductModel.findAll();
    return productsModel.map(
      (product) => new Product(product.id, product.name, product.price)
    );
  }
}
