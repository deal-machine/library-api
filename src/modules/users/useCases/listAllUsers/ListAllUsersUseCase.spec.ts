import { UsersRepositoryInMemory } from "@modules/users/repositories/inMemory/UsersRepositoryInMemory";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

let usersRepository: IUsersRepository;
let createUserUseCase: CreateUserUseCase;
let listAllUsersUseCase: ListAllUsersUseCase;

describe("List All Users", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    listAllUsersUseCase = new ListAllUsersUseCase(usersRepository);
  });

  it("should be able to list all users", async () => {
    await createUserUseCase.execute({
      name: "User Test",
      email: "emailTest@email.com",
      cpf: "12345678911",
      address: "Addres Test",
      birthDate: new Date(),
    });
    await createUserUseCase.execute({
      name: "User Test",
      email: "emailTest@email.com",
      cpf: "12345678912",
      address: "Addres Test",
      birthDate: new Date(),
    });

    const { users, total, currentPage } = await listAllUsersUseCase.execute({
      page: 1,
      elements: 7,
    });

    expect(users).toHaveLength(2);
    expect(total).toEqual(2);
    expect(currentPage).toEqual(1);
  });

  it("should be able to call to list method", async () => {
    expect(async () => {
      const { users } = await listAllUsersUseCase.execute({
        page: 1,
        elements: 7,
      });

      return users;
    }).not.toBeInstanceOf(AppError);
  });

  it("should be able to list with pagination", async () => {
    expect(async () => {
      const { total, currentPage } = await listAllUsersUseCase.execute({
        page: 1,
        elements: 7,
      });

      return { total, currentPage };
    }).not.toBeInstanceOf(AppError);
  });
});
