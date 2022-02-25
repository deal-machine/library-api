import { inject, injectable } from "tsyringe";

import { Author } from "@shared/infra/sequelize/models";
import { AppError } from "@shared/errors/AppError";
import { IAuthorsRepository } from "../../repositories/IAuthorsRepository";

@injectable()
class UpdateAuthorUseCase {
  constructor(
    @inject("AuthorsRepository")
    private authorsRepository: IAuthorsRepository
  ) {}

  async execute(id: number, { name, namePublication }): Promise<Author> {
    const author = await this.authorsRepository.findById(id);
    if (!author) throw new AppError("Author not found.", 404);

    const nameAlreadyExists = await this.authorsRepository.findByName(name);
    if (nameAlreadyExists)
      throw new AppError("Author name already exists.", 409);

    await this.authorsRepository.update(author, {
      name,
      namePublication,
    });

    return author;
  }
}

export { UpdateAuthorUseCase };
