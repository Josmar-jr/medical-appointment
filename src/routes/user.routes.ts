import { Router } from "express";
import { authenticateUserUseController } from "../modules/users/useCases/authenticate-user";
import { createUserController } from "../modules/users/useCases/create-user";

const userRouter = Router();

userRouter.post("/login", async (request, response) =>
  authenticateUserUseController.handle(request, response)
);

userRouter.post("/", async (request, response) =>
  createUserController.handle(request, response)
);

export { userRouter };
