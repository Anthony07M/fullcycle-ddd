import { Customer } from "../../../../domain/customer/entity/customer.entity";
import { Address } from "../../../../domain/customer/object-value/address";
import { CustomerRepositoryInterface } from "../../../../domain/customer/repository/customer-repository.interface";
import { InputListCustomerDto } from "../dto/list-customers.dto";
import { ListCustomersUseCase } from "../list-customers.usecase";

describe("Unit test for listing customer use case", () => {
  let customerRepository: jest.Mocked<CustomerRepositoryInterface>;

  beforeEach(() => {
    customerRepository = {
      find: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn(),
    };
  });

  it("should list a customer", async () => {
    const customer1 = new Customer("1", "Jonh Doe");
    const address1 = new Address("Ouro verde", 9, "0000000", "manaus");

    const customer2 = new Customer("2", "Jane Doe");
    const address2 = new Address("Compensa", 9, "0000000", "manaus");

    customer1.changeAddress(address1);
    customer2.changeAddress(address2);

    customerRepository.findAll.mockResolvedValue(
      Promise.resolve([customer1, customer2])
    );

    const useCase = new ListCustomersUseCase(customerRepository);
    const input: InputListCustomerDto = {}

    const output = await useCase.execute(input);


    expect(output.customers.length).toEqual(2);

    expect(output.customers[0].id).toEqual(customer1.id);
    expect(output.customers[0].name).toEqual(customer1.name);
    expect(output.customers[0].address.city).toEqual(customer1.Address.city);
    expect(output.customers[0].address.number).toEqual(customer1.Address.number);
    expect(output.customers[0].address.street).toEqual(customer1.Address.street);
    expect(output.customers[0].address.zip).toEqual(customer1.Address.zip);


    expect(output.customers[1].id).toEqual(customer2.id);
    expect(output.customers[1].name).toEqual(customer2.name);
    expect(output.customers[1].address.city).toEqual(customer2.Address.city);
    expect(output.customers[1].address.number).toEqual(customer2.Address.number);
    expect(output.customers[1].address.street).toEqual(customer2.Address.street);
    expect(output.customers[1].address.zip).toEqual(customer2.Address.zip);


  });
});
