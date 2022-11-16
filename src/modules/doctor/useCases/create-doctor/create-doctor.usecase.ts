import { CustomError } from "../../../../errors/custom.error";
import { ISpecialtyRepository } from "../../../specialty/repositories/specialty.repository";
import { User } from "../../../users/entities/User.entity";
import { IUserRepository } from "../../../users/repositories/user.repository";
import { Doctor } from "../../entities/doctor.entity";
import { IDoctorRepository } from "../../repositories/doctor.repository";

export type CreateDoctorRequest = {
  username: string;
  name: string;
  password: string;
  email: string;
  crm: string;
  specialtyId: string;
};

export class CreateDoctorUseCase {
  constructor(
    private doctorRepository: IDoctorRepository,
    private userRepository: IUserRepository,
    private specialtyRepository: ISpecialtyRepository
  ) {}

  async execute(data: CreateDoctorRequest) {
    const user = await User.create({
      name: data.name,
      password: data.password,
      username: data.username,
    });

    const specialtyId = await this.specialtyRepository.findById(data.specialtyId)

    const existUser = await this.userRepository.findByUsername(data.username);

    if (existUser) {
      throw new CustomError(
        "Username already exists",
        400,
        "USER_EXISTS_ERROR"
      );
    }

    const userCreated = await this.userRepository.save(user);

    const doctor = Doctor.create({
      crm: data.crm,
      email: data.email,
      specialtyId: data.specialtyId,
      userId: userCreated.id,
    });

    const crmExists = await this.doctorRepository.findByCRM(data.crm);

    if (crmExists) {
      throw new CustomError("CRM already exists", 400);
    }

    const doctorCreated = await this.doctorRepository.save(doctor);

    return doctorCreated;
  }
}
