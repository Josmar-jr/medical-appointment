import { NextFunction, Request, Response } from "express";
import { UserPrismaRepository } from "../../../../modules/users/repositories/implementations/user.prisma.repository";

export const EnsureAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userRepository = new UserPrismaRepository();
  const user = await userRepository.findById(request.userId);

  if (!user) {
    return response.status(400).json({
      error: "User not found",
    });
  }

  if (!user.isAdmin) {
    return response.status(400).json({
      error: "User is not a administrator",
    });
  }

  return next();
};
