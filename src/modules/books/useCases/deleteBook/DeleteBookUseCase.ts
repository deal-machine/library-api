import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteBookUseCase {
  constructor(
    @inject("BooksRepository")
    private booksRepository: IBooksRepository
  ) {}

  async execute(id: number): Promise<void> {
    const book = await this.booksRepository.findById(id);

    if (!book) throw new AppError("Book not found.", 404);

    await this.booksRepository.delete(book.id);
  }
}
export { DeleteBookUseCase };
