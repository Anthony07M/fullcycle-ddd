import { Product } from "../product/product.entity";
import { RepositoryInterface } from "./repository.interface";

export interface ProductRepositoryInterface extends RepositoryInterface<Product> {}
