import { EventHandlerInterface } from "../../event-handler.interface";
import { EventInterface } from "../../event.interface";
import { ProductCreatedEvent } from "../product-created.event";

export class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
    handle(event: ProductCreatedEvent): void {
        console.log('send to email....');
    }
}