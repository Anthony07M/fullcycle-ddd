import { Order } from "../entity/order.entity";
import { OrderItem } from "../order_items";

interface OrderFactoryPropsInterface {
  id: string;
  customerId: string;
  items: {
    id: string;
    name: string;
    productId: string;
    quantity: number;
    price: number;
  }[];
}
export class OrderFactory {
  static create(props: OrderFactoryPropsInterface): Order {
    const items = props.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.productId,
          item.quantity
        )
    );

    return new Order(props.id, props.customerId, items);
  }
}
