import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import {
  BookAttributes,
  IBooksRepository,
} from "@modules/books/repositories/IBooksRepository";

import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateBookUseCase {
  constructor(
    @inject("BooksRepository")
    private booksRepository: IBooksRepository
  ) {}

  async execute(
    id: number,
    { title, abstract, release }: BookAttributes
  ): Promise<void> {
    const book = await this.booksRepository.findById(id);
    if (!book) throw new AppError("Book not found.", 404);

    const isBookUpdated = await this.booksRepository.update(book, {
      title,
      abstract,
      release,
    });

    if (!isBookUpdated) throw new AppError("Cannot update book.", 406);
  }
}

export { UpdateBookUseCase };
