import { EventInterface } from "../../@shared/events/event.interface";

export class ChangeAddressEvent implements EventInterface {
    dataTimeOcurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.eventData = eventData;
        this.dataTimeOcurred = new Date();
    }
    
}