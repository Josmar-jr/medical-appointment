import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../../errors/custom.error";
import { JWTToken } from "../../token/jwt.token";

export const ensureAuthenticate = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  /**
   * 1 - receber o meu token
   * 2 - validar se o token está correto
   * 3 - se correto, passar para o proximo passo
   * 4 - se	não, retornar com erro
   */

  const headerAuth = request.headers.authorization;

  if (!headerAuth) {
    return response.status(401).json({
      error: "Token is missing",
    });
  }

  const [, token] = headerAuth.split(" ");
  console.log(token);

  if (!token) {
    return response.status(401).json({
      error: "Token is missing",
    });
  }

  const verifyToken = new JWTToken().validate(token);

  if (verifyToken) {
    request.userId = verifyToken.sub;
    return next();
  }

  return response.status(401).json({
    error: "Token invalid ",
  });
};
