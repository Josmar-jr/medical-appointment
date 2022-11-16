import { Doctor } from "../../entities/doctor.entity";
import { IDoctorRepository } from "../doctor.repository";

export class DoctorMemoryRepository implements IDoctorRepository {
  doctors: Doctor[];

  constructor() {
    this.doctors = [];
  }
  async save(data: Doctor): Promise<Doctor> {
    this.doctors.push(data);

    return data;
  }

  async findByCRM(crm: string): Promise<Doctor | null>{
    return this.doctors.find((doctor) => doctor.crm === crm) || null;
  }
}
