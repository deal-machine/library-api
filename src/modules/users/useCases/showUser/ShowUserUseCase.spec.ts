import { UsersRepositoryInMemory } from "@modules/users/repositories/inMemory/UsersRepositoryInMemory";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserUseCase } from "./ShowUserUseCase";

let usersRepository: IUsersRepository;
let createUserUseCase: CreateUserUseCase;
let showUserUseCase: ShowUserUseCase;

describe("Show User", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    showUserUseCase = new ShowUserUseCase(usersRepository);
  });

  it("should be able to show an user", async () => {
    const user = await createUserUseCase.execute({
      name: "User Test",
      email: "emailTest@email.com",
      cpf: "12345678912",
      address: "Addres Test",
      birthDate: new Date(),
    });

    const foudUser = await showUserUseCase.execute(Number(user.id));

    expect(foudUser).toHaveProperty("id", user.id);
  });

  it("should not be able to show a non existing user", async () => {
    expect(async () => {
      const foundUser = await showUserUseCase.execute(123);

      return foundUser;
    }).rejects.toBeInstanceOf(AppError);
  });
});
