import { User } from "../entities/User.entity";

export class UserRepository {
  users: User[] = [];

  private static instance: UserRepository;

  private constructor() {
    this.users = [];
  }

  static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }

    return UserRepository.instance;
  }

  async findByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  async save(data: User) {
    this.users.push(data);

    return this.users;
  }
}
