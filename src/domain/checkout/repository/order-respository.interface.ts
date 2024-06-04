import { RepositoryInterface } from "../../@shared/repository/repository.interface";
import { Order } from "../entity/order.entity";

export interface OrderRespositoryInterface extends RepositoryInterface<Order> {}
