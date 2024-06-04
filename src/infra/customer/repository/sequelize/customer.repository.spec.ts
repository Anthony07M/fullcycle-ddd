import { Sequelize } from "sequelize-typescript";
import { CustomerRepository } from "./customer.repository";
import { CustomerModel } from "./customer.model";
import { Customer } from "../../../../domain/customer/entity/customer.entity";
import { Address } from "../../../../domain/customer/object-value/address";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  it("should a create new customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Jonh Doe");
    const address = new Address("Ouro verde", 9, "69018660", "manaus");

    customer.Address = address;

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: customer.Address.street,
      number: customer.Address.number,
      zipcode: customer.Address.zip,
      city: customer.Address.city,
      active: customer.isActive(),
      rewarPoints: customer.rewardPoints,
    });
  });

  it("should a update customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Jonh Doe");
    const address = new Address("Ouro verde", 9, "69018660", "manaus");

    customer.Address = address;

    await customerRepository.create(customer);

    customer.changeName("Jane Doe");
    customer.addReardPoints(10);
    customer.deactivate();

    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: "Jane Doe",
      street: customer.Address.street,
      number: customer.Address.number,
      zipcode: customer.Address.zip,
      city: customer.Address.city,
      active: false,
      rewarPoints: 10,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Jonh Doe");
    const address = new Address("Ouro verde", 9, "69018660", "manaus");

    customer.Address = address;

    await customerRepository.create(customer);

    const customerResult = await customerRepository.find(customer.id);

    expect(customer).toStrictEqual(customerResult);
  });

  it("should throw an error customer is not found", async () => {
    const customerRepository = new CustomerRepository();
    
    expect(async () => {
      const customer = await customerRepository.find("idNotFound");
    }).rejects.toThrow("Customer not found");
  })
  
  it("should ", async () => {
    const customerRepository = new CustomerRepository();

    const customerOne = new Customer("1", "Jonh Doe");
    const customerTwo = new Customer("2", "Jane Doe");

    const address = new Address("Ouro verde", 9, "69018660", "manaus");

    customerOne.changeAddress(address);
    customerTwo.changeAddress(address);


    await customerRepository.create(customerOne)
    await customerRepository.create(customerTwo)

    const customers = await customerRepository.findAll();

    expect(customers).toStrictEqual([customerOne, customerTwo])


  })

  afterEach(async () => {
    await sequelize.close();
  });
});
