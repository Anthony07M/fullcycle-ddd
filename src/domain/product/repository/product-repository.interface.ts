import { Product } from "../entity/product.entity";
import { RepositoryInterface } from "../../@shared/repository/repository.interface";

export interface ProductRepositoryInterface extends RepositoryInterface<Product> {}
