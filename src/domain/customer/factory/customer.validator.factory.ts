import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import { Customer } from "../entity/customer.entity";
import { CustomerYupValidator } from "../validator/customer.validator.yup";

export class CustomerValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    return new CustomerYupValidator();
  }
}
