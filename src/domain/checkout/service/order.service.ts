import { randomUUID } from 'node:crypto';
import { Customer } from "../../customer/entity/customer.entity";
import { OrderItem } from '../order_items';
import { Order } from '../entity/order.entity';


export class OrderSerivce {
  static total(orders: Order[]) {
    return orders.reduce((acc, current) => acc + current.total(), 0);
  }
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if(items.length === 0) {
      throw new Error("Order must have at leat one item")
    }

    const order = new Order(randomUUID(), customer.id, items);

    customer.addReardPoints(order.total() / 2);

    return order;
  }
}
