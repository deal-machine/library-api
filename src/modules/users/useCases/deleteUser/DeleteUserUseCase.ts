import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: number): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError("User not found.", 404);

    await this.usersRepository.delete(user.id);
  }
}

export { DeleteUserUseCase };
