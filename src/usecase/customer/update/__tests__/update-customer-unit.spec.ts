import { Customer } from "../../../../domain/customer/entity/customer.entity";
import { Address } from "../../../../domain/customer/object-value/address";
import { CustomerRepositoryInterface } from "../../../../domain/customer/repository/customer-repository.interface";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "../dto/customer-update.dto";
import { UpdateCustomerUseCase } from "../update-customer.usecase";

describe("Unit test update customer use case", () => {
  let customerRepository: jest.Mocked<CustomerRepositoryInterface>;

  beforeEach(() => {
    customerRepository = {
      find: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn(),
    };
  });

  it("should update a customer", async () => {
    const customer = new Customer("1", "Jonh Doe");
    const address = new Address("Ouro verde", 9, "0000000", "manaus");
    customer.changeAddress(address);

    const input: InputUpdateCustomerDto = {
      id: customer.id,
      name: "Jonh Updated",
      address: {
        street: "street updated",
        number: 10,
        zip: "0000001",
        city: "manaus updated",
      },
    };
    
    customerRepository.find.mockReturnValue(Promise.resolve(customer)) ;
    
    const useCase = new UpdateCustomerUseCase(customerRepository);
    const output = await useCase.execute(input);

    expect(output).toEqual(input);
  });
});
