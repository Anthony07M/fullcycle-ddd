import { Customer } from "../entity/customer.entity";
import { randomUUID as uuid } from 'crypto'
import { Address } from "../object-value/address";

export class CustomerFactory {
    static create(name: string): Customer {
        return new Customer(uuid(), name);
    }

    static createWithAddress(name:string, address: Address) {
        const customer = new Customer(uuid(), name);
        customer.changeAddress(address);
        
        return customer;
    }
}