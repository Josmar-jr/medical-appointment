import { sign } from "jsonwebtoken";
import { createHmac } from "crypto";
import { User } from "../../../modules/users/entities/User.entity";
import { IToken } from "./token";

export class JWTToken implements IToken {
  private TOKEN_SECRET = process.env.SECRET_KEY_TOKEN || "";

  private TOKEN_SECRET_CRYPTO = createHmac("sha256", this.TOKEN_SECRET).digest(
    "base64"
  );

  create({ username, id, isAdmin }: User): string {
    const token = sign(
      {
        user: {
          username,
          id,
          isAdmin,
        },
      },
      this.TOKEN_SECRET_CRYPTO,
      {
        subject: id,
        expiresIn: "1m",
      }
    );

    return token;
  }
}
