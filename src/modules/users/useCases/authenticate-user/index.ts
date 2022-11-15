import { PasswordBcrypt } from "../../../../infra/shared/crypto/password.bcrypt";
import { UserPrismaRepository } from "../../repositories/implementations/user.prisma.repository";
import { AuthenticateUserController } from "./authenticate-use.controller";
import { JWTToken } from "../../../../infra/shared/token/jwt.token";

const token = new JWTToken();
const useRepository = new UserPrismaRepository();
const passwordCrypto = new PasswordBcrypt();
const authenticateUserUseController = new AuthenticateUserController(
  useRepository,
  passwordCrypto,
  token
);

export { authenticateUserUseController };
