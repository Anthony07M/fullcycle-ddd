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
    const address = new Address("Ouro verde", 9, "0000000", "manaus");

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

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

   expect(orderModel.toJSON()).toStrictEqual({
     id: order.id,
     customer_id: customer.id,
     total: order.total(),
     items: [
       {
         id: orderItem.id,
         product_id: product.id,
         order_id: order.id,
         quantity: orderItem.quantity,
         name: orderItem.name,
         price: orderItem.price,
       },
     ],
   });
  });

  it("should find order", async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("1", "Jonh Doe");
    const address = new Address("Ouro verde", 9, "0000000", "manaus");

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

    const foundOrder = await orderRepository.find(order.id);
    expect(foundOrder).toStrictEqual(order);
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("1", "Jonh Doe");
    const address = new Address("Ouro verde", 9, "0000000", "manaus");

    customer.changeAddress(address);
    await customerRepository.create(customer);

    const product = new Product("1", "Product 1", 20);
    const product2 = new Product("2", "Product 2", 10);

    await productRepository.create(product);
    await productRepository.create(product2)

    const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
    const orderItem2 = new OrderItem("2", product2.name, product2.price, product2.id, 2);


    const order = new Order("1", customer.id, [orderItem])
    const order2 = new Order("2", customer.id, [orderItem2]);

    await orderRepository.create(order);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();


    expect(orders).toEqual([order, order2]);
  });
  
  it("should update order", async () =>  {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("1", "Jonh Doe");
    const address = new Address("Ouro verde", 9, "0000000", "manaus");

    customer.changeAddress(address);
    await customerRepository.create(customer);

    const product = new Product("1", "Product 1", 20);
    const product2 = new Product("2", "Product 2", 15);
    await productRepository.create(product);
    await productRepository.create(product2);

    const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
    const order = new Order("1", customer.id, [orderItem])
    await orderRepository.create(order);
    
    const orderItem2 = new OrderItem("2", product2.name, product2.price, product2.id, 2);

    order.addItem(orderItem2);
    await orderRepository.update(order);

    const orderFound = await OrderModel.findOne({ where: { id: order.id }, include: ['items']},);


    expect(orderFound.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: product.id,
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: order.id,
          product_id: product2.id,
        }
      ]
    })

  });
});
