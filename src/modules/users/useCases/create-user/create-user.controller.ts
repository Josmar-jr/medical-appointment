import { Request, Response } from "express";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";
import { logger } from "../../../../utils/logger";
import { IUserRepository } from "../../repositories/user.repository";
import { CreateUserUseCase } from "./create-user.usecase";

export class CreateUserController {
  constructor(private useRepository: IUserRepository, private passwordCrypto: IPasswordCrypto) {}

  async handle(request: Request, response: Response) {
    try {
      const data = request.body;

      const useCase = new CreateUserUseCase(this.useRepository, this.passwordCrypto);
      const result = await useCase.execute(data);

      return response.json(result);
    } catch (err: any) {
      logger.error(err.stack);
      return response.status(400).send(err);
    }
  }
}
