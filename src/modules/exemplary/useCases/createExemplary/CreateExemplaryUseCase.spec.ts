import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";
import { BooksRepositoryInMemory } from "@modules/books/repositories/inMemory/BooksRepositoryInMemory";
import { CreateBookUseCase } from "@modules/books/useCases/createBook/CreateBookUseCase";
import { IExemplaryRepository } from "@modules/exemplary/repositories/IExemplaryRepository";
import { ExemplaryRepositoryInMemory } from "@modules/exemplary/repositories/inMemory/ExemplaryRepositoryInMemory";
import { CreateExemplaryUseCase } from "@modules/exemplary/useCases/createExemplary/CreateExemplaryUseCase";
import { PublishersRepositoryInMemory } from "@modules/publishers/repositories/inMemory/PublishersRepositoryInMemory";
import { IPublishersRepository } from "@modules/publishers/repositories/IPublishersRepository";
import { CreatePublisherUseCase } from "@modules/publishers/useCases/createPublisher/CreatePublisherUseCase";

import { AppError } from "@shared/errors/AppError";

let createExemplaryUseCase: CreateExemplaryUseCase;
let createBookUseCase: CreateBookUseCase;
let exemplaryRepository: IExemplaryRepository;
let booksRepository: IBooksRepository;

let createPublisherUseCase: CreatePublisherUseCase;
let publishersRepository: IPublishersRepository;

describe("Create Exemplary", () => {
  beforeEach(() => {
    exemplaryRepository = new ExemplaryRepositoryInMemory();
    booksRepository = new BooksRepositoryInMemory();
    publishersRepository = new PublishersRepositoryInMemory();
    createPublisherUseCase = new CreatePublisherUseCase(publishersRepository);
    createBookUseCase = new CreateBookUseCase(
      booksRepository,
      publishersRepository
    );
    createExemplaryUseCase = new CreateExemplaryUseCase(
      exemplaryRepository,
      booksRepository
    );
  });

  it("should be able to create a new exemplary", async () => {
    const publisher = await createPublisherUseCase.execute({
      description: "New Description",
    });

    const newBook = await createBookUseCase.execute({
      title: "Book Title Test",
      abstract: "Abstract Test",
      release: new Date(),
      publisherId: publisher.id,
    });

    const newExemplary = await createExemplaryUseCase.execute(
      Number(newBook.id),
      {
        sampleCode: "Sample Code Test",
        provider: "Provider Test",
        purchaseDate: new Date(),
      }
    );

    expect(newExemplary).toHaveProperty("id");
  });

  it("should not be able to create a new exemplary without a valid book", async () => {
    expect(async () => {
      const newExemplary = await createExemplaryUseCase.execute(Number(123), {
        sampleCode: "Sample Code Test",
        provider: "Provider Test",
        purchaseDate: new Date(),
      });

      return newExemplary;
    }).rejects.toBeInstanceOf(AppError);
  });
});
