import { EventHandlerInterface } from "../../../@shared/events/event-handler.interface";
import { ChangeAddressEvent } from "../change-address.event";

export class SendConsoleChangeAddressHandler implements EventHandlerInterface<ChangeAddressEvent> {
    handle(event: ChangeAddressEvent): void {
        console.log(`Endereço do cliente ${event.eventData.id}, ${event.eventData.name} alterado para: `, event.eventData.address);
    }

}