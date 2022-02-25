import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { Exemplary } from "@database/models";
import {
  ExemplaryAttributes,
  IExemplaryRepository,
} from "@modules/exemplary/repositories/IExemplaryRepository";
import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";

import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateExemplaryUseCase {
  constructor(
    @inject("ExemplaryRepository")
    private exemplaryRepository: IExemplaryRepository,
    @inject("BooksRepository")
    private booksRepository: IBooksRepository
  ) {}

  async execute(
    bookId: number,
    { sampleCode, purchaseDate, provider }: ExemplaryAttributes
  ): Promise<Exemplary> {
    const book = await this.booksRepository.findById(bookId);

    if (!book) throw new AppError("Book not found.", 404);

    const newExemplary = await this.exemplaryRepository.create({
      sampleCode,
      purchaseDate,
      provider,
      bookId,
    });

    if (!newExemplary)
      throw new AppError("Cannot create a new Exemplary.", 406);

    return newExemplary;
  }
}

export { CreateExemplaryUseCase };
