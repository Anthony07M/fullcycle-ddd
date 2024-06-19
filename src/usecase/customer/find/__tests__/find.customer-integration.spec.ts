import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../../../../infra/customer/repository/sequelize/customer.model";
import { CustomerRepository } from "../../../../infra/customer/repository/sequelize/customer.repository";
import { Customer } from "../../../../domain/customer/entity/customer.entity";
import { Address } from "../../../../domain/customer/object-value/address";
import {
  InputFindCustomerDto,
  OutputListCustomerDto,
} from "../dto/find-customer.dto";
import { FindCustomerUseCase } from "../find-customer.usecase";

describe("Unit test find customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const useCase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer("1", "Jonh Doe");
    const address = new Address("Ouro verde", 9, "0000000", "manaus");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const input: InputFindCustomerDto = {
      id: "1",
    };

    const output: OutputListCustomerDto = {
      id: "1",
      name: "Jonh Doe",
      address: {
        street: "Ouro verde",
        number: 9,
        zip: "0000000",
        city: "manaus",
      },
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });

  it("should ", () => {});
  it("should ", () => {});
  it("should ", () => {});

  afterEach(async () => {
    await sequelize.close();
  });
});
