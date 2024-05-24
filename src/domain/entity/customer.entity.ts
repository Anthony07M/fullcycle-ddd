import { Address } from "./address";

export class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active = false;
  private _rewardPoints: number = 0

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  // Esse método já é uma regra de negócio, logo essa classe não é mais anêmica
  changeName(newName: string): void {
    // por exemplo eu posso adicionar validação nesse nome recebido por paramêtro
    this._name = newName;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  set Address(address: Address) {
    this._address = address;
  }

  get name(): string {
    return this._name;
  }

  get id(): string {
    return this._id;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get Address(): Address {
    return this._address;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }

    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }
  deactivate() {
    this._active = false;
  }

  
  addReardPoints(points: number) {
    this._rewardPoints += points;
  }
}

/*
    ENTIDADE ANÊMICAS

    Olhando para essa classe, o que faz pensar que ela é uma entidade ? 
        R: Por causa do seu ID, toda entidade é única. E o que torna essa classe
        única é seu ID, pois todos os customers vão ter ids diferentes


    obs: classse anêmica é uma classe que só carrega dados

    Essa classe é uma entidade anêmica, porque ? 
        R: Porque ela está apenas guardando dados
*/

/*
    REGRAS DE NEGÓCIO
    * Quando há mudanças de regras ou aplicação de regras na classe, como por exemplo:
        adicionar um changeName(newName) -> funçao que vai alterar o nome da entidad/classe
        nesse caso já estamos falando de regra de negócio e essa classe não se torna mais uma 
        classe anêmica. Outro exemplo é desativar ou ativar o usuário, se esses métodos existirem
        então a minha classe já tem regra de negócio, ou seja não é mais uma classe anêmica.
 */

/*
    CONSCISTÊNCIA CONSTANTE EM PRIMEIRO LUGAR

    * A entidade sempre obrigatóriamente vai ter que representar o estado correto e atual daquele elemento
    * Os dados a todo momento eles precisam está consistente
    * Se a entidade não estiver 100% consistente então eu não estou cobrindo a regra de negócio
*/

/*
    PRINCÍPIO DE AUTOVALIDAÇÃO
    * Uma entidade por padrão ela sempre vai se autovalidar
    ex: Se não tiver validação eu posso criar um customer dessa forma. const customer = new Customer("123", "", "", "")
*/

/*
    ENTIDADE VS ORM
    
    * Existem entidades focadas em NEGÓCIO e PERSISTÊNCIA

    ***Complexidade de negócio
    - Entity -> fala com negócio
        - customer.ts (regra de negócio)
    ***Complexidade acidental
    - Infra -> fala com o mundo externo
        - Entity / Model
            - customer.ts (get, set)
*/
