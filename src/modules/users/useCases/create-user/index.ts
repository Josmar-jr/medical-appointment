import { UserPrismaRepository } from "../../repositories/implementations/user.prisma.repository";
import { CreateUserController } from "./create-user.controller";
import { PasswordBcrypt } from "../../../../infra/shared/crypto/password.bcrypt";

const passwordCrypto = new PasswordBcrypt();
const userPrismaRepository = new UserPrismaRepository();
const createUserController = new CreateUserController(userPrismaRepository, passwordCrypto);

export { createUserController };
