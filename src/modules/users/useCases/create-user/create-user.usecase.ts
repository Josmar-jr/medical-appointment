import { CustomError } from "../../../../errors/custom.error";
import { ParameterRequiredError } from "../../../../errors/parameter-required.error";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";
import { User } from "../../entities/User.entity";
import { IUserRepository } from "../../repositories/user.repository";

interface UserRequest {
  name: string;
  username: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto
  ) {}

  async execute(data: UserRequest) {
    const user = User.create(data);

    if (!data.username || !data.password) {
      throw new ParameterRequiredError("Username/password is required.", 422);
    }

    const existUser = await this.userRepository.findByUsername(data.username);

    if (existUser) {
      throw new CustomError(
        "Username already exists",
        400,
        "USER_EXISTS_ERROR"
      );
    }

    const passwordHashed = await this.passwordCrypto.hash(data.password);
    user.password = passwordHashed;
    
    const userCreate = await this.userRepository.save(user);

    return userCreate;
  }
}
