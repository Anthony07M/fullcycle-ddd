import { Entity } from "../../@shared/entity/entity.abstract";
import { NotificationError } from "../../@shared/notification/notification.error";
import { ProductValidatorFactory } from "../factory/product.validator.factory";
import { ProductInterface } from "./product.interface";

export class Product extends Entity implements ProductInterface{
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
    if(this.notification.hasErrors()){
      throw new NotificationError(this.notification.getErrors());
    }
  }

  validate(): boolean {
    ProductValidatorFactory.create().validate(this);
    return
    /*if (this._id.length === 0) {
      this.notification.addError({
        context: "product",
        message: "Id is required"
      })
    }
    
    if(this._name.length === 0) {
      this.notification.addError({
        context: "product",
        message: "name is required"
      })
    }
    
    if(this._price <= 0) {
      this.notification.addError({
        context: "product",
        message: "price must be greater than 0"
      })
    }

    return true;
    */
  }

  changeName(name: string): void {
    this._name = name;
  }

  changePrice(price: number) {
    if(price <= 0) {
        throw new Error("price must be greater than 0")
    }

    this._price = price;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }
}
