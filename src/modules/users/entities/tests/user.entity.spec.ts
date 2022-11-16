import { describe, test, expect } from "vitest";
import { User } from "../User.entity";

describe("User entity", () => {
  test("Should be able to create a new user", async () => {
    const user = await User.create({
      name: "Fulaninha",
      password: "randompassword",
      username: "fulaninha",
    });

    expect(user).toBeInstanceOf(User);
    expect(user).toHaveProperty("id");
    expect(user.password).not.equal("randompassword");
  });

});
