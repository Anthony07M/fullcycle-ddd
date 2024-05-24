import { Order } from "../entity/order.entity";
import { RepositoryInterface } from "./repository.interface";

export interface OrderRespositoryInterface extends RepositoryInterface<Order> {}
