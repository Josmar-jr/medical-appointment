import { randomUUID } from "crypto";

type ISpecialty = {
  name: string;
  description: string;
};

export class Specialty {
  id: string;
  name: string;
  description: string;
  createdAt: Date;

  constructor(props: ISpecialty) {
    this.name = props.name;
    this.description = props.description;
    this.createdAt = new Date();
    this.id = randomUUID();
  }

  static create(props: ISpecialty) {
    if (!props.name) {
      throw new Error("Specialty name is required!");
    }

    const specialty = new Specialty(props);
    return specialty;
  }
}
