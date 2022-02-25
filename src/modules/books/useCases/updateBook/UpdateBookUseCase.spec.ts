import {
  BookAttributes,
  IBooksRepository,
} from "@modules/books/repositories/IBooksRepository";
import { BooksRepositoryInMemory } from "@modules/books/repositories/inMemory/BooksRepositoryInMemory";
import { CreateBookUseCase } from "../createBook/CreateBookUseCase";
import { UpdateBookUseCase } from "./UpdateBookUseCase";

import { AppError } from "@shared/errors/AppError";
import { PublishersRepositoryInMemory } from "@modules/publishers/repositories/inMemory/PublishersRepositoryInMemory";
import { IPublishersRepository } from "@modules/publishers/repositories/IPublishersRepository";
import { CreatePublisherUseCase } from "@modules/publishers/useCases/createPublisher/CreatePublisherUseCase";

let booksRepository: IBooksRepository;
let createBookUseCase: CreateBookUseCase;
let updateBookUseCase: UpdateBookUseCase;
let createPublisherUseCase: CreatePublisherUseCase;
let publishersRepository: IPublishersRepository;

describe("Update Book", () => {
  beforeEach(() => {
    booksRepository = new BooksRepositoryInMemory();
    publishersRepository = new PublishersRepositoryInMemory();
    createPublisherUseCase = new CreatePublisherUseCase(publishersRepository);
    createBookUseCase = new CreateBookUseCase(
      booksRepository,
      publishersRepository
    );
    updateBookUseCase = new UpdateBookUseCase(booksRepository);
  });

  it("should be able to update a book", async () => {
    expect(async () => {
      const publisher = await createPublisherUseCase.execute({
        description: "New Description",
      });

      const book: BookAttributes = {
        title: "TitleTest",
        abstract: "AbstractTest",
        release: new Date(),
        publisherId: publisher.id,
      };

      const newBook = await createBookUseCase.execute({
        title: book.title,
        abstract: book.abstract,
        release: book.release,
        publisherId: book.publisherId,
      });

      await updateBookUseCase.execute(Number(newBook.id), {
        title: "Updated Title Test",
        abstract: "Updated Abstract Test",
        release: newBook.release,
      });
    }).not.toBeInstanceOf(AppError);
  });

  it("should not be able to update a non existing book", async () => {
    expect(async () => {
      await updateBookUseCase.execute(123, {
        title: "Updated Title Test",
        abstract: "Updated Abstract Test",
        release: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
