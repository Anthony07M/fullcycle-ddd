import { Customer } from "../../../../domain/customer/entity/customer.entity";
import { Address } from "../../../../domain/customer/object-value/address";
import { CustomerRepositoryInterface } from "../../../../domain/customer/repository/customer-repository.interface";
import { CreateCustomerUseCase } from "../create-customer.usecase";
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from "../dto/create-customer.dto";

describe("Unit test create customer use case", () => {
  let customerRepository: jest.Mocked<CustomerRepositoryInterface>;

  beforeEach(() => {
    customerRepository = {
      find: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn(),
    };
  });

  it("should create a customer", async () => {
    const useCase = new CreateCustomerUseCase(customerRepository);
    const input: InputCreateCustomerDto = {
      name: "Jonh Doe",
      address: {
        street: "Ouro verde",
        number: 9,
        zip: "0000000",
        city: "manaus",
      },
    };

    const output: OutputCreateCustomerDto = {
      id: expect.any(String),
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

  it("should thrown an error when name is missing", async () => {
    const input: InputCreateCustomerDto = {
      name: "",
      address: {
        street: "Ouro verde",
        number: 9,
        zip: "0000000",
        city: "manaus",
      },
    };

    const useCase = new CreateCustomerUseCase(customerRepository);
    expect(async () => {
        const result = await useCase.execute(input);
    }).rejects.toThrow("Name is required");
  });
});
