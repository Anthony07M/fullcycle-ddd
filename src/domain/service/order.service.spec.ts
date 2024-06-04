import { Customer } from "../customer/customer.entity";
import { OrderItem } from "../entity/order_items";
import { Order } from "../order/order.entity";
import { OrderSerivce } from "./order.service";

describe("Order service unit testes", () => {
  it("should place an order", () => {
    const customer = new Customer("123", "Jonh Doe");
    const item1 = new OrderItem("123", "Item 1", 10, "idproduct", 1);

    const order = OrderSerivce.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toEqual(5)
    expect(order.total()).toEqual(10);
  });

  it("should get total of all orders", () => {
    const orderItem1 = new OrderItem("123", "Item 1", 10, "productId 1", 2);
    const orderItem2 = new OrderItem("123", "Item 2", 15, "productId 1", 2);

    const order1 = new Order("123", "123", [orderItem1]);
    const order2 = new Order("123", "123", [orderItem1, orderItem2]);

    const total = OrderSerivce.total([order1, order2]);
    expect(total).toBe(70);
  });
});
