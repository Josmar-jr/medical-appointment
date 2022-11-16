import { test, expect, describe } from "vitest";
import { Doctor } from "../doctor.entity";

describe("Doctor entity", () => {
  test("Should be able to register a new doctor", () => {
    const doctor = Doctor.create({
      crm: "123456",
      email: "john@example.com",
      userId: "USER_ID",
      specialtyId: "SPEC_ID",
    });

    expect(doctor).toBeInstanceOf(Doctor);
    expect(doctor).toHaveProperty("id");
  });

  test("Should not be able to register a new doctor with CRM invalid", () => {
    expect(() =>
      Doctor.create({
        crm: "",
        email: "john@example.com",
        userId: "USER_ID",
        specialtyId: "SPEC_ID",
      })
    ).toThrow("CRM is required!");
  });

  test("Should not be able to register a new doctor with CRM length invalid", () => {
    expect(() =>
      Doctor.create({
        crm: "123",
        email: "john@example.com",
        userId: "USER_ID",
        specialtyId: "SPEC_ID",
      })
    ).toThrow("CRM is invalid!");
  });

  test("Should not be able to register a new doctor with email invalid", () => {
    expect(() =>
      Doctor.create({
        crm: "123456",
        email: "",
        userId: "USER_ID",
        specialtyId: "SPEC_ID",
      })
    ).toThrow("E-mail is required!");
  });
});
