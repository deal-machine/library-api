import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { Book } from "@database/models";
import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";

import { AppError } from "@shared/errors/AppError";

@injectable()
class ShowBookUseCase {
  constructor(
    @inject("BooksRepository")
    private booksRepository: IBooksRepository
  ) {}

  async execute(id: number): Promise<Book> {
    const book = await this.booksRepository.findById(id);

    if (!book) throw new AppError("Book not found.", 404);

    return book;
  }
}
export { ShowBookUseCase };
