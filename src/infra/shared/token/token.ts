import { User } from "../../../modules/users/entities/User.entity";

export type TokenUser = {
  sub: string;
};

export interface IToken {
  create(user: User): string;
  validate(token: string): TokenUser | null;
}
