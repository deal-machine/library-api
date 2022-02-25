import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import {
  IUsersRepository,
  ListUsersParams,
} from "@modules/users/repositories/IUsersRepository";
import { PaginationProps } from "@pagination/types";

import { AppError } from "@shared/errors/AppError";

@injectable()
class ListAllUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ page, elements }: PaginationProps): Promise<ListUsersParams> {
    let offset = (page - 1) * elements;
    if (page == 1) offset = 0;

    const { users, total } = await this.usersRepository.list({
      page: offset,
      elements,
    });

    if (!users) throw new AppError("Users not foud.", 404);

    return { users, currentPage: page, total };
  }
}

export { ListAllUsersUseCase };
