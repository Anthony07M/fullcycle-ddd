import { EventHandlerInterface } from "../../../@shared/events/event-handler.interface";
import { CreatedCustomerEvent } from "../created-customer.event";

export class HandlerConsoleTwo implements EventHandlerInterface<CreatedCustomerEvent> {
    handle(event: CreatedCustomerEvent): void {
        console.log(`Esse é o segundo console.log do evento: ${event.eventData.id}, ${event.eventData.name},`);
    }
    
}