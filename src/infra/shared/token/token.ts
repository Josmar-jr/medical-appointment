import { User } from "../../../modules/users/entities/User.entity";

export interface IToken {
  create(user: User): string;
}
