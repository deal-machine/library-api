import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import {
  IUsersRepository,
  UserAttributes,
} from "@modules/users/repositories/IUsersRepository";

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(
    id: number,
    { name, email, cpf, address, birthDate }: UserAttributes
  ): Promise<void> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) throw new AppError("User not found.", 404);

    const userCpfAlreadyExists = await this.usersRepository.findByCpf(cpf);
    if (userCpfAlreadyExists)
      throw new AppError("User CPF already exists.", 409);

    const updatedUser = await this.usersRepository.update(userExists, {
      name,
      email,
      cpf,
      address,
      birthDate,
    });

    if (!updatedUser) throw new AppError("Cannot update user.", 400);
  }
}

export { UpdateUserUseCase };
