import { UsersRepositoryInMemory } from "@modules/users/repositories/inMemory/UsersRepositoryInMemory";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

let usersRepository: IUsersRepository;
let createUserUseCase: CreateUserUseCase;
let deleteUserUseCase: DeleteUserUseCase;

describe("Delete User", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    deleteUserUseCase = new DeleteUserUseCase(usersRepository);
  });

  it("should be able to delete an user", async () => {
    expect(async () => {
      const user = await createUserUseCase.execute({
        name: "User Test",
        email: "emailTest@email.com",
        cpf: "12345678911",
        address: "Addres Test",
        birthDate: new Date(),
      });

      await deleteUserUseCase.execute(Number(user.id));
    }).not.toBeInstanceOf(AppError);
  });

  it("should not be able to delete a non existing use r", async () => {
    expect(async () => {
      await deleteUserUseCase.execute(123);
    }).rejects.toBeInstanceOf(AppError);
  });
});
