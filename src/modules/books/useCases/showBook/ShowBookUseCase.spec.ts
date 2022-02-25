import {
  BookAttributes,
  IBooksRepository,
} from "@modules/books/repositories/IBooksRepository";
import { BooksRepositoryInMemory } from "@modules/books/repositories/inMemory/BooksRepositoryInMemory";
import { PublishersRepositoryInMemory } from "@modules/publishers/repositories/inMemory/PublishersRepositoryInMemory";
import { IPublishersRepository } from "@modules/publishers/repositories/IPublishersRepository";
import { CreatePublisherUseCase } from "@modules/publishers/useCases/createPublisher/CreatePublisherUseCase";
import { AppError } from "@shared/errors/AppError";
import { CreateBookUseCase } from "../createBook/CreateBookUseCase";
import { ShowBookUseCase } from "./ShowBookUseCase";

let booksRepository: IBooksRepository;
let createBookUseCase: CreateBookUseCase;
let showBookUseCase: ShowBookUseCase;
let publishersRepository: IPublishersRepository;
let createPublisherUseCase: CreatePublisherUseCase;

describe("Show Book", () => {
  beforeEach(() => {
    booksRepository = new BooksRepositoryInMemory();
    publishersRepository = new PublishersRepositoryInMemory();
    createBookUseCase = new CreateBookUseCase(
      booksRepository,
      publishersRepository
    );
    createPublisherUseCase = new CreatePublisherUseCase(publishersRepository);
    showBookUseCase = new ShowBookUseCase(booksRepository);
  });

  it("should be able to show a book", async () => {
    const publisher = await createPublisherUseCase.execute({
      description: "New Description",
    });

    const newBook = await createBookUseCase.execute({
      title: "Title test",
      abstract: "Abstract test",
      release: new Date(),
      publisherId: publisher.id,
    });

    const foundedBook = await showBookUseCase.execute(Number(newBook.id));

    expect(foundedBook).toHaveProperty("id");
  });

  it("should not be able to show a non existing book", async () => {
    expect(async () => {
      const foundedBook = await showBookUseCase.execute(123);
      return foundedBook;
    }).rejects.toBeInstanceOf(AppError);
  });
});
