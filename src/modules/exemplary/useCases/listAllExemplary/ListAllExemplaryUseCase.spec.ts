import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";
import { BooksRepositoryInMemory } from "@modules/books/repositories/inMemory/BooksRepositoryInMemory";
import { CreateBookUseCase } from "@modules/books/useCases/createBook/CreateBookUseCase";
import { IExemplaryRepository } from "@modules/exemplary/repositories/IExemplaryRepository";
import { ExemplaryRepositoryInMemory } from "@modules/exemplary/repositories/inMemory/ExemplaryRepositoryInMemory";
import { PublishersRepositoryInMemory } from "@modules/publishers/repositories/inMemory/PublishersRepositoryInMemory";
import { IPublishersRepository } from "@modules/publishers/repositories/IPublishersRepository";
import { CreatePublisherUseCase } from "@modules/publishers/useCases/createPublisher/CreatePublisherUseCase";
import { AppError } from "@shared/errors/AppError";
import { CreateExemplaryUseCase } from "../createExemplary/CreateExemplaryUseCase";
import { ListAllExemplaryUseCase } from "./ListAllExemplaryUseCase";

let exemplaryRepository: IExemplaryRepository;
let booksRepository: IBooksRepository;
let createExemplaryUseCase: CreateExemplaryUseCase;
let createBookUseCase: CreateBookUseCase;
let listAllExemplaryUseCase: ListAllExemplaryUseCase;
let publishersRepository: IPublishersRepository;
let createPublisherUseCase: CreatePublisherUseCase;

describe("List All Exemplary", () => {
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
    listAllExemplaryUseCase = new ListAllExemplaryUseCase(exemplaryRepository);
  });

  it("should be able to list all exemplary", async () => {
    const publisher = await createPublisherUseCase.execute({
      description: "New description",
    });

    const book = await createBookUseCase.execute({
      title: "book.title",
      abstract: "book.abstract",
      release: new Date(),
      publisherId: publisher.id,
    });

    await createExemplaryUseCase.execute(Number(book.id), {
      sampleCode: "exemplary.sampleCode",
      provider: "exemplary.provider",
      purchaseDate: new Date(),
    });
    await createExemplaryUseCase.execute(Number(book.id), {
      sampleCode: "exemplary.sampleCode2",
      provider: "exemplary.provider2",
      purchaseDate: new Date(),
    });

    await createExemplaryUseCase.execute(Number(book.id), {
      sampleCode: "exemplary.sampleCode",
      provider: "exemplary.provider",
      purchaseDate: new Date(),
    });

    const allExemplary = await listAllExemplaryUseCase.execute();

    expect(allExemplary).toHaveLength(3);
  });

  it("should be able to call to list method", async () => {
    expect(async () => {
      const allExemplary = await listAllExemplaryUseCase.execute(
        1,
        "Test",
        "TestTwo",
        new Date(),
        new Date(),
        new Date(),
        new Date()
      );

      return allExemplary;
    }).not.toBeInstanceOf(AppError);
  });
});
