import { hash } from "bcryptjs";

interface ICreateDriver {
  readonly _phone: string;
  readonly _name: string;
  readonly _car: string;
  readonly _city1: string;
  readonly _city2: string;
  readonly _avatar: string;
}

export class Driver {
  private _password: string;

  constructor(private createDriverData: ICreateDriver) {}

  public async setPassword(password: string, salt: number): Promise<void> {
    this._password = await hash(password, salt);
  }

  get phone(): string {
    return this.createDriverData._phone;
  }

  get name(): string {
    return this.createDriverData._name;
  }

  get car(): string {
    return this.createDriverData._car;
  }

  get city1(): string {
    return this.createDriverData._city1;
  }

  get city2(): string {
    return this.createDriverData._city2;
  }

  get avatar(): string {
    return this.createDriverData._avatar;
  }
}
