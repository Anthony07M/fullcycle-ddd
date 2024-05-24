import { Address } from "./address";
import { Customer } from "./customer.entity";

describe("Unit test Customer", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Customer("", "Jonh Doe")).toThrow("Id is required");
    expect(() => new Customer("123", "")).toThrow("Name is required");
  });

  it("should change name", () => {
    const customer = new Customer("123", "Jonh Doe");
    customer.changeName("Jane Doe");

    expect(customer.name).toBe("Jane Doe");
  });

  it("should be activate customer", () => {
    const customer = new Customer("123", "Jonh Doe");
    const address = new Address("street 1", 123, "69018666", "Manaus");

    customer.Address = address;
    customer.activate();

    expect(customer.isActive()).toBeTruthy();
  });

  it("should throw error when address is undefined", () => {
    const customer = new Customer("123", "Jonh Doe");

    expect(() => {
        customer.activate();
    }).toThrow("Address is mandatory to activate a customer")
  });

  it("should be deactivate customer", () => {
    const customer = new Customer("123", "Jonh Doe");

    customer.deactivate();

    expect(customer.isActive()).toBeFalsy();
  });

  it("should add reward points", () => {
    const customer = new Customer("123", "Jonh Doe");
    expect(customer.rewardPoints).toEqual(0);

    customer.addReardPoints(10);
    expect(customer.rewardPoints).toEqual(10);

    customer.addReardPoints(10);
    expect(customer.rewardPoints).toEqual(20);
  });
});
