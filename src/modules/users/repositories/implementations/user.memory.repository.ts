import { User } from "../../entities/User.entity";
import { IUserRepository } from "../user.repository";

export class UserRepositoryMemory implements IUserRepository {
  users: User[] = [];

  private static instance: UserRepositoryMemory;

  private constructor() {
    this.users = [];
  }
  findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  static getInstance(): UserRepositoryMemory {
    if (!UserRepositoryMemory.instance) {
      UserRepositoryMemory.instance = new UserRepositoryMemory();
    }

    return UserRepositoryMemory.instance;
  }

  async findByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  async save(data: User) {
    this.users.push(data);

    return data;
  }
}
