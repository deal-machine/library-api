import { inject, injectable } from "tsyringe";

import { Author } from "@shared/infra/sequelize/models";
import { AppError } from "@shared/errors/AppError";
import { IAuthorsRepository } from "../../repositories/IAuthorsRepository";

@injectable()
class ShowAuthorUseCase {
  constructor(
    @inject("AuthorsRepository")
    private authorsRepository: IAuthorsRepository
  ) {}
  async execute(id: number): Promise<Author> {
    const author = await this.authorsRepository.findById(id);

    if (!author) throw new AppError("Author not found.", 404);

    return author;
  }
}

export { ShowAuthorUseCase };
