import { UsersRepositoryInMemory } from "@modules/users/repositories/inMemory/UsersRepositoryInMemory";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

let usersRepository: IUsersRepository;
let createUserUseCase: CreateUserUseCase;
let updateUserUseCase: UpdateUserUseCase;

describe("Update User", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();

    createUserUseCase = new CreateUserUseCase(usersRepository);
    updateUserUseCase = new UpdateUserUseCase(usersRepository);
  });

  it("should be able to update an user", async () => {
    expect(async () => {
      const user = await createUserUseCase.execute({
        name: "User Test",
        email: "emailTest@email.com",
        cpf: "12345678912",
        address: "Addres Test",
        birthDate: new Date(),
      });

      await updateUserUseCase.execute(user.id, {
        name: "User Test",
        email: "emailTest@email.com",
        cpf: "12345678912",
        address: "Addres Test",
        birthDate: new Date(),
      });
    }).not.toBeInstanceOf(AppError);
  });

  it("should not be able to update a non existing user", async () => {
    expect(async () => {
      await updateUserUseCase.execute(123, {
        name: "User Test",
        email: "emailTest@email.com",
        cpf: "12345678912",
        address: "Addres Test",
        birthDate: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update when cpf already exists", async () => {
    expect(async () => {
      const user = await createUserUseCase.execute({
        name: "User Test",
        email: "emailTest@email.com",
        cpf: "12345678912",
        address: "Addres Test",
        birthDate: new Date(),
      });

      await updateUserUseCase.execute(user.id, {
        name: "User Test",
        email: "emailTest@email.com",
        cpf: "12345678912",
        address: "Addres Test",
        birthDate: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
