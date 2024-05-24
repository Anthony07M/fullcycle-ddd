export class Address {
  _street: string = "";
  _number: number = 0;
  _zip: string = "";
  _city: string = "";

  constructor(
    street: string,
    number: number,
    zip: string,
    city: string,
  ) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get zip(): string {
    return this._zip;
  }

  get city(): string {
    return this._city;
  }

  validate(){
    if (this._city.length === 0) {
        throw new Error('city is required')
    }
    if (this._street.length === 0) {
        throw new Error('Street is required')
    }
    if (this._zip.length === 0) {
        throw new Error('Zip is required')
    }

    // resto da validação....
  }


}

// essa classe é um objeto de valor pois ela é imutável, não pode ser alterada, ela se autovalida e tem propiedades apenas para leitura
// eu também posso ter métodos de visualização, como por exemplo o toString()
// eu consigo visualizar de várias formas que eu preciso, mas não posso fazer alteração
// objetos de valores NÃO são únicos, ele só serve para carregar propiedades
