import { NotificationErrorType } from "./notification";

export class NotificationError extends Error {
    constructor(public errors: NotificationErrorType[]) {
        super(errors.map(error => error.message).join(","));
    }
}