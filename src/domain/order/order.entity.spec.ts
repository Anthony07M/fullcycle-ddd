import { Order } from "./order.entity";
import { OrderItem } from "../entity/order_items";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const order = new Order("", "123", []);
    }).toThrow("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      const order = new Order("123", "", []);
    }).toThrow("custumerId is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      const order = new Order("123", "123", []);
    }).toThrow("Items are required");
  });

  it("should be total equal 10", () => {
    const items: OrderItem[] = [
      new OrderItem("123", "Item 1", 10, "123", 2),
      new OrderItem("312", "Item 2", 20, "123", 2),
    ];
    const order = new Order("123", "123", items);

    const expectTotal = 60;

    expect(order.total()).toEqual(expectTotal);
  });


  it("should throw error if the item qtd is lass or equal zero", () => {
    expect(() => {
      const item: OrderItem =  new OrderItem("123", "Item 1", 10, "123", 0)
      const order = new Order("123", "123", [item]);
    }).toThrow("Quantity must be greater than 0");
  });
});
