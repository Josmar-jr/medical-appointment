import bcrypt from "bcryptjs";

import { IPasswordCrypto } from "./password.crypto";

export class PasswordBcrypt implements IPasswordCrypto {
  compare(password: string, passwordHash: string): Promise<boolean> {
    const isEqual = bcrypt.compare(password, passwordHash);
    return isEqual;
  }

  hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
