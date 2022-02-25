import {
  BookAttributes,
  IBooksRepository,
} from "@modules/books/repositories/IBooksRepository";
import { BooksRepositoryInMemory } from "@modules/books/repositories/inMemory/BooksRepositoryInMemory";
import { PublishersRepositoryInMemory } from "@modules/publishers/repositories/inMemory/PublishersRepositoryInMemory";
import { IPublishersRepository } from "@modules/publishers/repositories/IPublishersRepository";
import { CreatePublisherUseCase } from "@modules/publishers/useCases/createPublisher/CreatePublisherUseCase";
import { AppError } from "@shared/errors/AppError";
import { CreateBookUseCase } from "./CreateBookUseCase";

let booksRepositoryInMemory: IBooksRepository;
let publishersRepositoryInMemory: IPublishersRepository;
let createBookUseCase: CreateBookUseCase;
let createPublisherUseCase: CreatePublisherUseCase;

describe("", () => {
  beforeEach(() => {
    booksRepositoryInMemory = new BooksRepositoryInMemory();
    publishersRepositoryInMemory = new PublishersRepositoryInMemory();
    createBookUseCase = new CreateBookUseCase(
      booksRepositoryInMemory,
      publishersRepositoryInMemory
    );
    createPublisherUseCase = new CreatePublisherUseCase(
      publishersRepositoryInMemory
    );
  });

  it("should be able to create a new book", async () => {
    const publisher = await createPublisherUseCase.execute({
      description: "New Description",
    });

    const book: BookAttributes = {
      title: "Title Test",
      abstract: "Abstract Test",
      release: new Date(),
      publisherId: publisher.id,
    };

    const newBook = await createBookUseCase.execute({
      title: book.title,
      abstract: book.abstract,
      release: book.release,
      publisherId: book.publisherId,
    });

    expect(newBook).toHaveProperty("id");
  });

  it("should not be able to create a book with the same title", async () => {
    const publisher = await createPublisherUseCase.execute({
      description: "New Description",
    });

    expect(async () => {
      const newBook = await createBookUseCase.execute({
        title: "Title Test",
        abstract: "Abstract Test",
        release: new Date(),
        publisherId: publisher.id,
      });

      const newBook2 = await createBookUseCase.execute({
        title: "Title Test",
        abstract: "Abstract Test",
        release: new Date(),
        publisherId: publisher.id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
