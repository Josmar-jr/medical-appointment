import { User } from "../entities/User.entity";

export interface IUserRepository {
  findByUsername(username: string): Promise<User | undefined>;
  save(data: User): Promise<User>;
  findById(id: string): Promise<User | null>;
} 
