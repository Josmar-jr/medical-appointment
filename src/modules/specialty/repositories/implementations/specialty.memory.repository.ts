import { Specialty } from "../../entities/Specialty.entity";
import { ISpecialtyRepository } from "../specialty.repository";

export class SpecialtyMemoryRepository implements ISpecialtyRepository {
  specialties: Specialty[];

  constructor() {
    this.specialties = [];
  }

  async findByName(name: string): Promise<Specialty | null> {
    return (
      this.specialties.find((specialty) => specialty.name === name) || null
    );
  }
  async save(data: Specialty): Promise<Specialty> {
    this.specialties.push(data);
    return data;
  }
  async findById(id: string): Promise<Specialty | null> {
    return this.specialties.find((specialty) => specialty.id === id) || null;
  }
}
