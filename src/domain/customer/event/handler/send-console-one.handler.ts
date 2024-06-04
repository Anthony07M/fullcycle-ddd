import { EventHandlerInterface } from "../../../@shared/events/event-handler.interface";
import { CreatedCustomerEvent } from "../created-customer.event";

export class HandlerConsoleOne implements EventHandlerInterface<CreatedCustomerEvent> {
    handle(event: CreatedCustomerEvent): void {
        console.log(`Esse é o primeiro console.log do evento: ${event.eventData.id}, ${event.eventData.name},`);
    }
    
}