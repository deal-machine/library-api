import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { User } from "@database/models";
import {
  IUsersRepository,
  UserAttributes,
} from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    cpf,
    address,
    birthDate,
  }: UserAttributes): Promise<User> {
    const userCpfAlreadyExists = await this.usersRepository.findByCpf(cpf);

    if (userCpfAlreadyExists)
      throw new AppError("User CPF already exists.", 409);

    const newUser = await this.usersRepository.create({
      name,
      email,
      cpf,
      address,
      birthDate,
    });

    if (!newUser) throw new AppError("Cannot create a new user.", 406);

    return newUser;
  }
}

export { CreateUserUseCase };
