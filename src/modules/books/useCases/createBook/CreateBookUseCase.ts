import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { IBooksRepository } from "../../repositories/IBooksRepository";
import { Book } from "@shared/infra/sequelize/models";

import { AppError } from "@shared/errors/AppError";
import { IPublishersRepository } from "@modules/publishers/repositories/IPublishersRepository";

@injectable()
class CreateBookUseCase {
  constructor(
    @inject("BooksRepository")
    private booksRepository: IBooksRepository,
    @inject("PublishersRepository")
    private publishersRepository: IPublishersRepository
  ) {}

  async execute({ title, abstract, release, publisherId }): Promise<Book> {
    const publisherExists = await this.publishersRepository.findById(
      publisherId
    );
    if (!publisherExists) throw new AppError("Publisher not found.", 404);

    const bookAlreadyExist = await this.booksRepository.findByTitle(title);

    if (bookAlreadyExist) throw new AppError("Book title already exists.", 409);

    const book = await this.booksRepository.create({
      title,
      release,
      abstract,
      publisherId,
    });
    return book;
  }
}

export { CreateBookUseCase };
