import { test, expect, describe, beforeAll } from "vitest";
import { Specialty } from "../../../../specialty/entities/Specialty.entity";
import { SpecialtyMemoryRepository } from "../../../../specialty/repositories/implementations/specialty.memory.repository";
import { ISpecialtyRepository } from "../../../../specialty/repositories/specialty.repository";
import { UserMemoryRepository } from "../../../../users/repositories/implementations/user.memory.repository";
import { DoctorMemoryRepository } from "../../../repositories/implementations/doctor.memory.repository";
import {
  CreateDoctorRequest,
  CreateDoctorUseCase,
} from "../create-doctor.usecase";

let specialtyRepository: ISpecialtyRepository
let specialty: Specialty

beforeAll(async () => {
  specialtyRepository = new SpecialtyMemoryRepository()

  specialty = Specialty.create({
    description: 'DESC_TEST',
    name: 'NAME_TEST',
  })

  await specialtyRepository.save(specialty)
})

describe("Create doctor use case", () => {
  test("Should be able to create a new Doctor", async () => {
    const userRepository = new UserMemoryRepository();
    const doctorRepository = new DoctorMemoryRepository();

    const doctorMock: CreateDoctorRequest = {
      email: "johndoe@gmail.com",
      crm: "273849",
      username: "johnin",
      name: "Dr. John Doe",
      password: "picainha123",
      specialtyId: specialty.id,
    };

    const createDoctorUseCase = new CreateDoctorUseCase(
      doctorRepository,
      userRepository,
      specialtyRepository
    );
    const doctorCreated = await createDoctorUseCase.execute(doctorMock);

    expect(doctorCreated).toHaveProperty("id");
  });

  test("Should not be able to create a new Doctor with exists CRM", async () => {
    const userRepository = new UserMemoryRepository();
    const doctorRepository = new DoctorMemoryRepository();

    const doctorMock: CreateDoctorRequest = {
      email: "johndoe@gmail.com",
      crm: "273849",
      username: "johnin",
      name: "Dr. John Doe",
      password: "picainha123",
      specialtyId: specialty.id,
    };

    const doctorMockDuplicate: CreateDoctorRequest = {
      email: "johndoe.duplicate@gmail.com",
      crm: "273849",
      username: "johnin_duplicate",
      name: "Dr. John Doe Duplicate",
      password: "picainha123Duplicate",
      specialtyId: specialty.id,
    };

    const createDoctorUseCase = new CreateDoctorUseCase(
      doctorRepository,
      userRepository,
      specialtyRepository
    );

    await createDoctorUseCase.execute(doctorMock);

    expect(
      async () => await createDoctorUseCase.execute(doctorMockDuplicate)
    ).rejects.toThrowError("CRM already exists");
  });

  test("Should not be able to create a new Doctor that does not have 6 digits", async () => {
    const userRepository = new UserMemoryRepository();
    const doctorRepository = new DoctorMemoryRepository();

    const doctorMock: CreateDoctorRequest = {
      email: "johndoe@gmail.com",
      crm: "27389",
      username: "johnin",
      name: "Dr. John Doe",
      password: "picainha123",
      specialtyId: specialty.id,
    };

    const createDoctorUseCase = new CreateDoctorUseCase(
      doctorRepository,
      userRepository,
      specialtyRepository
    );

    expect(
      async () => await createDoctorUseCase.execute(doctorMock)
    ).rejects.toThrowError("CRM is invalid!");
  });
});
