import { Customer } from "../../../../domain/customer/entity/customer.entity";
import { Address } from "../../../../domain/customer/object-value/address";
import {
  InputFindCustomerDto,
  OutputListCustomerDto,
} from "../dto/find-customer.dto";
import { FindCustomerUseCase } from "../find-customer.usecase";
import { CustomerRepositoryInterface } from "../../../../domain/customer/repository/customer-repository.interface";

describe("Unit test find customer use case", () => {
  let customerRepository: jest.Mocked<CustomerRepositoryInterface>;

  beforeEach(() => {
    const customer = new Customer("1", "Jonh Doe");
    const address = new Address("Ouro verde", 9, "0000000", "manaus");
    customer.changeAddress(address);

    customerRepository = {
      find: jest.fn().mockReturnValue(Promise.resolve(customer)),
      create: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn(),
    };

  });

  it("should find a customer", async () => {
    const useCase = new FindCustomerUseCase(customerRepository);
    const input: InputFindCustomerDto = { id: "1" };
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

  it("should not find a customer ", async () => {
    customerRepository.find.mockClear();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });

    const useCase = new FindCustomerUseCase(customerRepository);
    const input: InputFindCustomerDto = { id: "not_exist" };
    
    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow("Customer not found");
  });
});
