import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import { Product } from "../entity/product.entity";
import * as yup from "yup";

export class ProductYupValidator implements ValidatorInterface<Product> {
  validate(entity: Product): void {
    try {
      const schema = yup.object().shape({
        id: yup.string().required("Id is required"),
        name: yup.string().required("name is required"),
        price: yup
          .number()
          .required("Price is required")
          .positive("price must be greater than 0"),
      });

      schema.validateSync(entity, { abortEarly: false });
    } catch (e) {
      const error = e as yup.ValidationError;
      error.errors.forEach((error) => {
        entity.notification.addError({
          context: "product",
          message: error,
        });
      });
    }
  }
}
