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
import { UpdateExemplaryUseCase } from "./UpdateExemplaryUseCase";

let exemplaryRepository: IExemplaryRepository;
let booksRepository: IBooksRepository;

let createBookUseCase: CreateBookUseCase;
let createExemplaryUseCase: CreateExemplaryUseCase;
let updateExemplaryUseCase: UpdateExemplaryUseCase;

let publishersRepository: IPublishersRepository;
let createPublisherUseCase: CreatePublisherUseCase;

describe("Update Exemplary", () => {
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
    updateExemplaryUseCase = new UpdateExemplaryUseCase(
      exemplaryRepository,
      booksRepository
    );
  });

  it("should be able to update an Exemplary", async () => {
    const publisher = await createPublisherUseCase.execute({
      description: "New description",
    });

    const book = await createBookUseCase.execute({
      title: "book.title",
      abstract: "book.abstract",
      release: new Date(),
      publisherId: publisher.id,
    });
    const book2 = await createBookUseCase.execute({
      title: "book.title2",
      abstract: "book.abstract",
      release: new Date(),
      publisherId: publisher.id,
    });

    const exemplary = await createExemplaryUseCase.execute(Number(book.id), {
      sampleCode: "exemplary.sampleCode",
      provider: "exemplary.provider",
      purchaseDate: new Date(),
    });

    await updateExemplaryUseCase.execute(Number(exemplary.id), {
      bookId: Number(book2.id),
      sampleCode: "New Sample Code",
      provider: "New Provider",
      purchaseDate: new Date(),
    });

    expect(exemplary).toHaveProperty("bookId", Number(book2.id));
  });

  it("should not be able to update an Exemplary when book not exists", async () => {
    expect(async () => {
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

      const updatedExemplary = await updateExemplaryUseCase.execute(
        Number(exemplary.id),
        {
          bookId: Number(book.id) + 1,
          sampleCode: "New Sample Code",
          provider: "New Provider",
          purchaseDate: new Date(),
        }
      );
      return updatedExemplary;
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update a non existing Exemplary", async () => {
    expect(async () => {
      const publisher = await createPublisherUseCase.execute({
        description: "New description",
      });

      const book = await createBookUseCase.execute({
        title: "book.title",
        abstract: "book.abstract",
        release: new Date(),
        publisherId: publisher.id,
      });

      await updateExemplaryUseCase.execute(123, {
        bookId: Number(book.id),
        sampleCode: "SampleCode",
        provider: "Provider test",
        purchaseDate: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
