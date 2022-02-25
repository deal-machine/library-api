import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { IAuthorsRepository } from "../../repositories/IAuthorsRepository";
import { Author } from "@shared/infra/sequelize/models";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateAuthorUseCase {
  constructor(
    @inject("AuthorsRepository")
    private authorsRepository: IAuthorsRepository
  ) {}

  async execute({ name, namePublication }): Promise<Author> {
    const authorAlreadyExists = await this.authorsRepository.findByName(name);

    if (authorAlreadyExists) throw new AppError("Author already exists.", 409);

    const newAuthor = await this.authorsRepository.create({
      name,
      namePublication,
    });

    return newAuthor;
  }
}

export { CreateAuthorUseCase };
