export class Product {
  private __id: number;
  private __name: string;
  private __price: number;
  private __category: string;

  constructor(__id: number, __name: string, __price: number, __category: string) {
    
    this.__id = __id;
    this.__name = __name;
    this.__price = __price;
    this.__category = __category;
  }

  get id(): number {
    return this.__id;
  }
  get name(): string {
    return this.__name;
  }
  get price(): number {
    return this.__price;
  }
  get category(): string {
    return this.__category;
  }
}
