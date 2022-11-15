import { Specialty } from "../entities/Specialty.entity";

export interface ISpecialtyRepository {
  findByName(name: string): Promise<Specialty | null>;
  save(data: Specialty): Promise<Specialty>;
} 
