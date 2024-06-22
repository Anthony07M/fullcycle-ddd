import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import { Product } from "../entity/product.entity";
import { ProductYupValidator } from "../validator/product.validator.yup";

export class ProductValidatorFactory {
  static create(): ValidatorInterface<Product> {
    return new ProductYupValidator();
  }
}
