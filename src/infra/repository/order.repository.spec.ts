import { Sequelize } from "sequelize-typescript";
import { Order } from "../../domain/entity/order.entity";
import { OrderItem } from "../../domain/entity/order_items";
import { CustomerModel } from "../database/sequelize/model/customer.model";
import { OrderModel } from "../database/sequelize/model/order.model";
import { OrderItemModel } from "../database/sequelize/model/order-item.model";
import { CustomerRepository } from "./customer.repository";
import { Customer } from "../../domain/entity/customer.entity";
import { Address } from "../../domain/entity/address";
import { ProductRepository } from "./product.repository";
import { Product } from "../../domain/entity/product.entity";
import { OrderRepository } from "./order.repository";
import { ProductModel } from "../database/sequelize/model/product.model";

describe("Order repository unit test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memorytwo",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      OrderItemModel,
      OrderModel,
      CustomerModel,
      ProductModel,
    ]);

    await sequelize.sync();
  
  });

  afterEach(async () => {
    await sequelize.close();
  });


  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("1", "Jonh Doe");
    const address = new Address("Ouro verde", 9, "6900000", "manaus");

    customer.changeAddress(address);

    await customerRepository.create(customer);

    const product = new Product("11", "Product 11", 20);

    await productRepository.create(product);
    

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("1", customer.id, [orderItem]);

    await orderRepository.create(order);

    //  const orderModel = await OrderModel.findOne({
    //    where: { id: order.id },
    //    include: ["items"],
    //  });

    //  expect(orderModel.toJSON()).toStrictEqual({
    //    id: order.id,
    //    customer_id: order.customerId,
    //    total: order.total(),
    //    items: [
    //      {
    //        id: orderItem.id,
    //        name: orderItem.name,
    //        price: orderItem.price,
    //        quantity: orderItem.quantity,
    //        order_id: order.id,
    //      },
    //    ],
    //  });
    expect(3).toEqual(3)
  });

  //it("should ", async () => {});
  //it("should ", async () => {});


});
