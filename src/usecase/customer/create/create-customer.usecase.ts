import { Customer } from "../../../domain/customer/entity/customer.entity";
import { Address } from "../../../domain/customer/object-value/address";
import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository.interface";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./dto/create-customer.dto";
import { randomUUID as uuid} from 'node:crypto';

export class CreateCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
        const customer = new Customer(uuid(), input.name);
        const address = new Address(input.address.street,input.address.number, input.address.zip, input.address.city)
        customer.changeAddress(address);
        
        await this.customerRepository.create(customer);

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                city: customer.Address.city,
                number: customer.Address.number,
                zip: customer.Address.zip,
            }
        }
    }
}