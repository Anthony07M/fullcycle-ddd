import { Order } from "../../domain/entity/order.entity";
import { OrderItem } from "../../domain/entity/order_items";
import { OrderRespositoryInterface } from "../../domain/repository/order-respository.interface";
import { OrderItemModel } from "../database/sequelize/model/order-item.model";
import { OrderModel } from "../database/sequelize/model/order.model";

export class OrderRepository implements OrderRespositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
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
          };
        }),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    const order = await OrderModel.findByPk(entity.id, { include: ["items"] });

    await order
    .update({
      total: entity.total(),
    })
    .then(() => {
      OrderItemModel.bulkCreate(
        entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          order_id: entity.id,
          product_id: item.productId,
        })),
        {
          updateOnDuplicate: ["name", "price", "quantity", "product_id"],
        }
      );
    });
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: ["items"],
    });
    const items = orderModel.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        )
    );
    const order = new Order(orderModel.id, orderModel.customer_id, items);
    return order;
  }

  async findAll(): Promise<Order[]> {
    const ordersResult = await OrderModel.findAll({ include: ["items"] });
    const orders = ordersResult.map((order) => {
      return new Order(
        order.id,
        order.customer_id,
        order.items.map(
          (item) =>
            new OrderItem(
              item.id,
              item.name,
              item.price,
              item.product_id,
              item.quantity
            )
        )
      );
    });

    return orders;
  }
}
