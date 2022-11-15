import { Specialty } from "../entities/Specialty.entity";

export interface ISpecialtyRepository {
  findByName(name: string): Promise<Specialty | undefined>;
  save(data: Specialty): Promise<Specialty>;
} 
