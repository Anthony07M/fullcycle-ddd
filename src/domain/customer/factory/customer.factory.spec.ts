import { Address } from "../object-value/address";
import { CustomerFactory } from "./customer.factory";

describe("Unit test factory customer", () => {
    it("should be create customer", () => {
        const customer = CustomerFactory.create("Jonh Doe");

        expect(customer.name).toEqual("Jonh Doe");
        expect(customer.id).toBeDefined();
        expect(customer.Address).not.toBeDefined();
    });

    it("should be create customer with address", () => {
        const address = new Address("street", 0, "000000", "Manaus" );
        const customer = CustomerFactory.createWithAddress("Jonh Doe", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toEqual("Jonh Doe");
        expect(customer.Address).toEqual(address);
        
    });

    it("should be create customer", () => {});
});