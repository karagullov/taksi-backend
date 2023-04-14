import { hash } from "bcryptjs";

interface IDriverProps {
  phone: string;
  name: string;
  car: string;
  cities: string[];
  avatar?: string | undefined;
  _id: string;
}

export class Driver {
  private _password: string;
  private _phone: string;
  private _name: string;
  private _car: string;
  private _cities: string[];
  private _id: string;
  private _avatar?: string | undefined;

  constructor(model: IDriverProps) {
    this._phone = model.phone;
    this._name = model.name;
    this._car = model.car;
    this._cities = model.cities;
    this._id = model._id;
    this._avatar = model.avatar;
  }

  public async setPassword(password: string, salt: number): Promise<void> {
    this._password = await hash(password, salt);
  }

  get phone(): string {
    return this._phone;
  }

  get name(): string {
    return this._name;
  }

  get car(): string {
    return this._car;
  }

  get cities(): string[] {
    return this._cities;
  }

  get avatar(): string | undefined {
    return this._avatar;
  }

  get id(): string {
    return this._id;
  }
}
