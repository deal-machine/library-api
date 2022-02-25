import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

import { IAuthorsRepository } from "../../repositories/IAuthorsRepository";

@injectable()
class DeleteAuthorUseCase {
  constructor(
    @inject("AuthorsRepository")
    private authorRepository: IAuthorsRepository
  ) {}
  async execute(id: number): Promise<void> {
    const author = await this.authorRepository.findById(id);

    if (!author) throw new AppError("Author not found.", 404);

    const isAuthorDeleted = this.authorRepository.delete(id);

    if (!isAuthorDeleted) throw new AppError("Fail on delete.", 400);
  }
}

export { DeleteAuthorUseCase };
