import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import { Customer } from "../entity/customer.entity";
import * as yup from "yup";

export class CustomerYupValidator implements ValidatorInterface<Customer> {
  validate(entity: Customer): void {
    try {
      const schema = yup.object().shape({
        id: yup.string().required("Id is required"),
        name: yup.string().required("Name is required"),
      });

      schema.validateSync(entity, { abortEarly: false });
    } catch (errors) {
      const err = errors as yup.ValidationError;

      err.errors.forEach((error) => {
        entity.notification.addError({
          context: "customer",
          message: error,
        });
      });
    }
  }
}
