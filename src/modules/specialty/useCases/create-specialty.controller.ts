import { Request, Response } from "express";
import { SpecialtyRepository } from "../repositories/implementations/specialty.repository";
import { CreateSpecialtyUseCase } from "./create-specialty.usecase";

export class CreateSpecialtyController {
  constructor(private specialtyRepository: SpecialtyRepository) {}

  async handle(request: Request, response: Response) {
    try {
      const useCase = new CreateSpecialtyUseCase(this.specialtyRepository);

      const result = await useCase.execute(request.body);

      return response.json(result);
    } catch (err: any) {
      return response.status(err.statusCode || 400).json({
        error: err.message,
      });
    }
  }
}
