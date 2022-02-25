import { UsersRepositoryInMemory } from "@modules/users/repositories/inMemory/UsersRepositoryInMemory";
import {
  IUsersRepository,
  UserAttributes,
} from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: IUsersRepository;

describe("Create User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to create a new user", async () => {
    const user: UserAttributes = {
      name: "User Test",
      email: "emailTest@email.com",
      cpf: "12345678911",
      address: "Addres Test",
      birthDate: new Date(),
    };

    const newUser = await createUserUseCase.execute(user);

    expect(newUser).toHaveProperty(["id"]);
  });

  it("should not be able to create a user with the same cpf", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "User Test",
        email: "emailTest@email.com",
        cpf: "12345678911",
        address: "Addres Test",
        birthDate: new Date(),
      });

      await createUserUseCase.execute({
        name: "User Test2",
        email: "emailTest2@email.com",
        cpf: "12345678911",
        address: "Addres Test2",
        birthDate: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
