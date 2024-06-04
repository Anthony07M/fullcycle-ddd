export class Product {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    
    if(this._name.length === 0) {
        throw new Error("name is required");
    }
    
    if(this._price <= 0) {
        throw new Error("price must be greater than 0");
    }

    return true;

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
