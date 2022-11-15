import { Router } from "express";
import { createSpecialtyController } from "../modules/specialty/useCases";

const specialtyRouter = Router();

specialtyRouter.post("/", async (request, response) =>
  createSpecialtyController.handle(request, response)
);

export { specialtyRouter };
