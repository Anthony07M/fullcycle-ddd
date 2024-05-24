import { OrderItem } from "./order_items";

export class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items() {
    return this._items
  }

  total(): number {
    return this._items.reduce((acc, current) => acc + current.price, 0);
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }

    if (this._customerId.length === 0) {
      throw new Error("custumerId is required");
    }

    if (this._items.length === 0) {
      throw new Error("Items are required");
    }

    return true;
  }
}

// se uma entidade está em diferentes agregados, então a relação é por ID
// se a entidade está no mesmo agregado, então a relação é por Entidade/Objeto
