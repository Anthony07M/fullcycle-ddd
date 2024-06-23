import { Request, Response, Router } from "express";
import { ListProductsUseCase } from "../../../usecase/product/list/list-products.usecase";
import { ProductRepository } from "../../product/repository/sequelize/product.repository";
import { InputCreateProductDto } from "../../../usecase/product/create/dto/create-product.dto";
import { CreateProductUseCase } from "../../../usecase/product/create/create-product.usecase";
import { ProductPresenter } from "../presenters/product/customer.presenter";

export const productRoutes = Router();

productRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const createProductUseCase = new CreateProductUseCase(
      new ProductRepository()
    );

    const inputDto: InputCreateProductDto = {
      name: req.body.name,
      price: req.body.price,
    };

    const product = await createProductUseCase.execute(inputDto);
    return res.send(product);
  } catch (err) {
    return res.status(500).send(err);
  }
});

productRoutes.get("/", async (req: Request, res: Response) => {
  const listProductsUseCase = new ListProductsUseCase(new ProductRepository());

  const products = await listProductsUseCase.execute({});

  res.format({
    json: async () => res.send(products),
    xml: async () => res.send(ProductPresenter.listXML(products)),
  });
});
