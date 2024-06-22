export type NotificationErrorType = {
  message: string;
  context: string;
};

export class Notification {
  private errors: NotificationErrorType[] = [];

  addError(error: NotificationErrorType): void {
    this.errors.push(error);
  }

  messages(contenxt?: string): string {
    let message = "";
    this.errors.forEach((error) => {
      if (contenxt === undefined || error.context === contenxt) {
        message += `${error.context}: ${error.message},`;
      }
    });

    return message;
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  getErrors(): NotificationErrorType[] {
    return this.errors;
  }
}
