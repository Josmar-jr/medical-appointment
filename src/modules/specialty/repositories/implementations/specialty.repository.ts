import { prismaClient } from "../../../../infra/databases/prisma.config";
import { Specialty } from "../../entities/Specialty.entity";
import { ISpecialtyRepository } from "../specialty.repository";

class SpecialtyRepository implements ISpecialtyRepository {
  findByName(name: string): Promise<Specialty | undefined> {
    throw new Error("Method not implemented.");
  }
  async save(data: Specialty): Promise<Specialty> {
    const specialty = await prismaClient.specialty.create({
      data: {
        name: data.name,
        description: data.description,
        id: data.id,
      },
    });

    return specialty;
  }
}

export { SpecialtyRepository };
