import { EventDispatcher } from "../../@shared/events/event-dispatcher";
import { Customer } from "../entity/customer.entity";
import { Address } from "../object-value/address";
import { ChangeAddressEvent } from "./change-address.event";
import { CreatedCustomerEvent } from "./created-customer.event";
import { SendConsoleChangeAddressHandler } from "./handler/send-console-change-address.handler";
import { HandlerConsoleOne } from "./handler/send-console-one.handler";
import { HandlerConsoleTwo } from "./handler/send-console-two.handler";

const CREATED_CUSTOMER_EVENT = "CreatedCustomerEvent";
const UPDATED_ADDRESS_EVENT = "ChangeAddressEvent";

describe("Domain unit tests Domain events customer", () => {
  it("should be notify events console one and tow", () => {
    const customer = new Customer("1", "Customer");

    const handler1 = new HandlerConsoleOne();
    const handler2 = new HandlerConsoleTwo();
    const dispatcher = new EventDispatcher();

    const spyHandler1 = jest.spyOn(handler1, "handle");
    const spyHandler2 = jest.spyOn(handler2, "handle");

    dispatcher.register(CREATED_CUSTOMER_EVENT, handler1);
    dispatcher.register(CREATED_CUSTOMER_EVENT, handler2);

    expect(dispatcher.getEventHandlers[CREATED_CUSTOMER_EVENT].length).toBe(2);
    expect(
      dispatcher.getEventHandlers[CREATED_CUSTOMER_EVENT][0]
    ).toMatchObject(handler1);
    expect(
      dispatcher.getEventHandlers[CREATED_CUSTOMER_EVENT][1]
    ).toMatchObject(handler2);

    const event = new CreatedCustomerEvent({
      id: customer.id,
      name: customer.name,
    });

    dispatcher.notify(event);

    expect(spyHandler1).toHaveBeenCalledWith(event);
    expect(spyHandler2).toHaveBeenCalledWith(event);
  });

  it("Should create and handle AddressChanged event correctly", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("street", 0, "0000000", "manaus");

    const handler = new SendConsoleChangeAddressHandler();
    const dispatcher = new EventDispatcher();

    dispatcher.register(UPDATED_ADDRESS_EVENT, handler);

    expect(dispatcher.getEventHandlers[UPDATED_ADDRESS_EVENT].length).toBe(1);
    expect(dispatcher.getEventHandlers[UPDATED_ADDRESS_EVENT][0]).toMatchObject(handler);
    expect(customer.Address).toBeUndefined();

    customer.changeAddress(address);
    const event = new ChangeAddressEvent({
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        zip: customer.Address.zip,
        city: customer.Address.city,
      },
    });

    const spyHandler = jest.spyOn(handler, "handle");
    dispatcher.notify(event);

    expect(spyHandler).toHaveBeenCalledWith(event);
  });
});
