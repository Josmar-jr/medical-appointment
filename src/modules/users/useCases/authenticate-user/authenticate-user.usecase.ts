import { CustomError } from "../../../../errors/custom.error";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";
import { IToken } from "../../../../infra/shared/token/token";
import { IUserRepository } from "../../repositories/user.repository";

type AuthenticateRequest = {
  username: string;
  password: string;
};

export class AuthenticateUserUseCase {
  // username, password
  // validar se existe e validar a senha
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto,
    private token: IToken
  ) {}

  async execute({ username, password }: AuthenticateRequest) {
    console.log(username);

    if (!username || !password) {
      throw new CustomError("username/password is required", 401);
    }

    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new CustomError("User not found", 401);
    }

    const comparePasswordEquals = this.passwordCrypto.compare(
      password,
      user.password
    );

    if (!comparePasswordEquals) {
      throw new CustomError("username/password incorrect", 401);
    }

    const tokenGenerate = this.token.create(user);

    return tokenGenerate;
  }
}
