import { Order } from "../../domain/entity/order.entity";
import { OrderRespositoryInterface } from "../../domain/repository/order-respository.interface";
import { OrderItemModel } from "../database/sequelize/model/order-item.model";
import { OrderModel } from "../database/sequelize/model/order.model";

export class OrderRepository implements OrderRespositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                }
            })
        }, {
            include: [{ model: OrderItemModel }]
        })
    }
    async update(entity: Order): Promise<void> {
        throw new Error("update Method not implemented.");
    }
    async find(id: string): Promise<Order> {
        throw new Error("find Method not implemented.");
    }
    async findAll(): Promise<Order[]> {
        throw new Error("findAll Method not implemented.");
    }
}