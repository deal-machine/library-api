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
import { ShowBookUseCase } from "../showBook/ShowBookUseCase";
import { DeleteBookUseCase } from "./DeleteBookUseCase";

let booksRepository: IBooksRepository;
let createBookUseCase: CreateBookUseCase;
let showBookUseCase: ShowBookUseCase;
let deleteBookUseCase: DeleteBookUseCase;
let publishersRepository: IPublishersRepository;
let createPublisherUseCase: CreatePublisherUseCase;

describe("Delete Book", () => {
  beforeEach(() => {
    booksRepository = new BooksRepositoryInMemory();
    publishersRepository = new PublishersRepositoryInMemory();

    createBookUseCase = new CreateBookUseCase(
      booksRepository,
      publishersRepository
    );
    createPublisherUseCase = new CreatePublisherUseCase(publishersRepository);
    showBookUseCase = new ShowBookUseCase(booksRepository);
    deleteBookUseCase = new DeleteBookUseCase(booksRepository);
  });

  it("should be able to delete a book", async () => {
    expect(async () => {
      const publisher = await createPublisherUseCase.execute({
        description: "New description",
      });

      const newBook = await createBookUseCase.execute({
        title: "Title Test",
        abstract: "Abstract Test",
        release: new Date(),
        publisherId: publisher.id,
      });

      await deleteBookUseCase.execute(Number(newBook.id));

      const deletedBook = await showBookUseCase.execute(Number(newBook.id));

      return deletedBook;
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to delete an non existing book", async () => {
    expect(async () => {
      await deleteBookUseCase.execute(123);
    }).rejects.toBeInstanceOf(AppError);
  });
});
