import { Router } from "express";
import { EnsureAdmin } from "../infra/shared/http/middleware/ensure-admin.middleware";
import { ensureAuthenticate } from "../infra/shared/http/middleware/ensure-authenticate.middleware";
import { createSpecialtyController } from "../modules/specialty/useCases";

const specialtyRouter = Router();

specialtyRouter.post(
  "/",
  ensureAuthenticate,
  EnsureAdmin,
  async (request, response) =>
    createSpecialtyController.handle(request, response)
);

export { specialtyRouter };
