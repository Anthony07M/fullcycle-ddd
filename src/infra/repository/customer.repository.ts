import { Address } from "../../domain/entity/address";
import { Customer } from "../../domain/entity/customer.entity";
import { CustomerRepositoryInterface } from "../../domain/repository/customer-repository.interface";
import { CustomerModel } from "../database/sequelize/model/customer.model";

export class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.Address.street,
      number: entity.Address.number,
      zipcode: entity.Address.zip,
      city: entity.Address.city,
      active: entity.isActive(),
      rewarPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.Address.street,
        number: entity.Address.number,
        zipcode: entity.Address.zip,
        city: entity.Address.city,
        active: entity.isActive(),
        rewarPoints: entity.rewardPoints,
      },
      { where: { id: entity.id } }
    );
  }

  async find(id: string): Promise<Customer> {
    try {
      const customerResult = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true,
      });
      const customer = new Customer(customerResult.id, customerResult.name);

      const address = new Address(
        customerResult.street,
        customerResult.number,
        customerResult.zipcode,
        customerResult.city
      );

      customer.Address = address;

      return customer;
    } catch (err) {
      throw new Error("Customer not found");
    }
  }

  async findAll(): Promise<Customer[]> {
    const customersModels = await CustomerModel.findAll();

    const customers = customersModels.map((_customer) => {
      const customer = new Customer(_customer.id, _customer.name);
      const address = new Address(_customer.street, _customer.number, _customer.zipcode, _customer.city);

      customer.changeAddress(address);
      customer.addReardPoints(_customer.rewarPoints);

      if(_customer.active){
        customer.activate();
      }
      return customer;
    });

    return customers;

  }
}
