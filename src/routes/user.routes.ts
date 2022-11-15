import { Router } from "express";
import { createUserController } from "../modules/users/useCases/create-user";

const userRouter = Router();

userRouter.post("/", async (request, response) =>
  createUserController.handle(request, response)
);

export { userRouter };
