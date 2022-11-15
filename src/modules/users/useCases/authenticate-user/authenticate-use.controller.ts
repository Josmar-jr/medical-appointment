import { Request, Response } from "express";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";
import { IToken } from "../../../../infra/shared/token/token";
import { IUserRepository } from "../../repositories/user.repository";
import { AuthenticateUserUseCase } from "./authenticate-user.usecase";

export class AuthenticateUserController {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto,
    private token: IToken
  ) {}

  async handle(request: Request, response: Response) {
    try {
      const authenticateUserUseCase = new AuthenticateUserUseCase(
        this.userRepository,
        this.passwordCrypto,
        this.token
      );

      const result = await authenticateUserUseCase.execute(request.body);

      return response.json(result);
    } catch (err: any) {
      return response.status(err.statusCode || 400).json({
        error: err.message,
      });
    }
  }
}
