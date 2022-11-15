import { CustomError } from "../../../errors/custom.error";
import { Specialty } from "../entities/Specialty.entity";
import { ISpecialtyRepository } from "../repositories/specialty.repository";

type SpecialtyRequest = {
  name: string;
  description: string;
};

class CreateSpecialtyUseCase {
  constructor(private specialtyRepository: ISpecialtyRepository) {}

  async execute(data: SpecialtyRequest) {
    const specialty = new Specialty(data);

    const specialtyAlreadyExists = await this.specialtyRepository.findByName(
      data.name
    );

    if (specialtyAlreadyExists) {
      throw new CustomError("Specialty already exists");
    }

    const specialtyCreated = await this.specialtyRepository.save(specialty);

    return specialtyCreated;
  }
}

export { CreateSpecialtyUseCase };
