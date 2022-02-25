import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { User } from "@database/models";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

import { AppError } from "@shared/errors/AppError";

@injectable()
class ShowUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute(id: number): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError("User not found.", 404);

    return user;
  }
}

export { ShowUserUseCase };
