import { randomUUID } from "crypto";

type IUser = {
  name: string;
  password: string;
  username: string;
};

export class User {
  name: string;
  username: string;
  password: string;
  private _id: string;
  private _isAdmin: boolean;

  private constructor(props: IUser) {
    this.name = props.name;
    this.username = props.username;
    this.password = props.password;
    this._id = randomUUID();
    this._isAdmin = false;
  }

  static create(props: IUser): User {
    const user = new User(props);

    return user;
  }

  get id() {
    return this._id;
  }

  get isAdmin() {
    return this._isAdmin;
  }
}
