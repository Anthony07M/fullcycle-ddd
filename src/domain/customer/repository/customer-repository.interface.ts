import { RepositoryInterface } from "../../@shared/repository/repository.interface";
import { Customer } from "../entity/customer.entity";

export interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {}
