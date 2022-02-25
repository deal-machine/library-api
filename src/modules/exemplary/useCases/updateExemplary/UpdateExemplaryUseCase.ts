import "reflect-metadata";

import { injectable, inject } from "tsyringe";

import {
  ExemplaryAttributes,
  IExemplaryRepository,
} from "@modules/exemplary/repositories/IExemplaryRepository";
import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";

import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateExemplaryUseCase {
  constructor(
    @inject("ExemplaryRepository")
    private exemplaryRepository: IExemplaryRepository,
    @inject("BooksRepository")
    private booksRepository: IBooksRepository
  ) {}

  async execute(
    id: number,
    { bookId, sampleCode, provider, purchaseDate }: ExemplaryAttributes
  ): Promise<void> {
    const bookExists = await this.booksRepository.findById(bookId);
    if (!bookExists) throw new AppError("Book not found.", 404);

    const exemplary = await this.exemplaryRepository.findById(id);
    if (!exemplary) throw new AppError("Exemplary not found.", 404);

    const isExemplaryUpdated = await this.exemplaryRepository.update(
      exemplary,
      {
        bookId,
        sampleCode,
        provider,
        purchaseDate,
      }
    );

    if (!isExemplaryUpdated)
      throw new AppError("Cannot update exemplary.", 406);
  }
}

export { UpdateExemplaryUseCase };
