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
import { ShowExemplaryUseCase } from "./ShowExemplaryUseCase";

let exemplaryRepository: IExemplaryRepository;
let booksRepository: IBooksRepository;
let createExemplaryUseCase: CreateExemplaryUseCase;
let createBookUseCase: CreateBookUseCase;
let showAExemplaryUseCase: ShowExemplaryUseCase;
let publishersRepository: IPublishersRepository;
let createPublisherUseCase: CreatePublisherUseCase;

describe("Show Exemplary", () => {
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
    showAExemplaryUseCase = new ShowExemplaryUseCase(exemplaryRepository);
  });

  it("should be able to show an Exemplary", async () => {
    const publisher = await createPublisherUseCase.execute({
      description: "New description",
    });

    const book = await createBookUseCase.execute({
      title: "book.title",
      abstract: "book.abstract",
      release: new Date(),
      publisherId: publisher.id,
    });

    const exemplary = await createExemplaryUseCase.execute(Number(book.id), {
      sampleCode: "exemplary.sampleCode",
      provider: "exemplary.provider",
      purchaseDate: new Date(),
    });

    const foundExemplary = await showAExemplaryUseCase.execute(
      Number(exemplary.id)
    );

    expect(foundExemplary).toHaveProperty("id", exemplary.id);
  });

  it("should not be able to show an non existing Exemplary", async () => {
    expect(async () => {
      const foundExemplary = await showAExemplaryUseCase.execute(123);
      return foundExemplary;
    }).rejects.toBeInstanceOf(AppError);
  });
});
