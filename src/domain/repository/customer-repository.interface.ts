import { Customer } from "../entity/customer.entity";
import { RepositoryInterface } from "./repository.interface";

export interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {}
