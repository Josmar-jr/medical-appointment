import { User } from "../../entities/User.entity";
import { UserRepository } from "../../repositories/user.repository";

interface UserRequest {
  name: string;
  username: string;
  password: string;
}

export class CreateUserUseCase {
  async execute(data: UserRequest) {
    const userRepository = UserRepository.getInstance();

    if (!data.username || !data.password) {
      throw new Error("Username/password is required.");
    }

    const alreadyExistsUser = await userRepository.findByUsername(
      data.username
    );

    if (alreadyExistsUser) {
      throw new Error("User already exists");
    }

    const user = User.create(data);
    const userCreate = await userRepository.save(user);

    return userCreate;
  }
}
