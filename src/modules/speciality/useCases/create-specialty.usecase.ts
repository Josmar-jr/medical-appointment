import { Specialty } from "../entities/Specialty.entity";

type SpecialtyRequest = {
  name: string;
  description: string;
};

class CreateSpecialty {
  async execute(data: SpecialtyRequest) {
    const specialty = new Specialty(data);
  }
}
