import {
  BookAttributes,
  IBooksRepository,
} from "@modules/books/repositories/IBooksRepository";

import { BooksRepositoryInMemory } from "@modules/books/repositories/inMemory/BooksRepositoryInMemory";

import { CreateBookUseCase } from "../createBook/CreateBookUseCase";
import { ListAllBooksUseCase } from "./ListAllBooksUseCase";

import { AppError } from "@shared/errors/AppError";
import { IPublishersRepository } from "@modules/publishers/repositories/IPublishersRepository";
import { PublishersRepositoryInMemory } from "@modules/publishers/repositories/inMemory/PublishersRepositoryInMemory";
import { CreatePublisherUseCase } from "@modules/publishers/useCases/createPublisher/CreatePublisherUseCase";

let booksRepository: IBooksRepository;
let listAllBooksUseCase: ListAllBooksUseCase;
let createBookUseCase: CreateBookUseCase;
let publishersRepository: IPublishersRepository;
let createPublisherUseCase: CreatePublisherUseCase;

describe("List All Books", () => {
  beforeEach(() => {
    booksRepository = new BooksRepositoryInMemory();
    publishersRepository = new PublishersRepositoryInMemory();
    createPublisherUseCase = new CreatePublisherUseCase(publishersRepository);

    createBookUseCase = new CreateBookUseCase(
      booksRepository,
      publishersRepository
    );
    listAllBooksUseCase = new ListAllBooksUseCase(booksRepository);
  });

  it("should be able to list all books", async () => {
    const publisher = await createPublisherUseCase.execute({
      description: "New Publisher",
    });

    const book1: BookAttributes = {
      title: "Title Test 1",
      abstract: "Abstract Test 1",
      release: new Date(),
      publisherId: publisher.id,
    };
    const book2: BookAttributes = {
      title: "Title Test 2",
      abstract: "Abstract Test 2",
      release: new Date(),
      publisherId: publisher.id,
    };

    await createBookUseCase.execute({
      title: book1.title,
      release: book1.release,
      abstract: book1.abstract,
      publisherId: book1.publisherId,
    });
    await createBookUseCase.execute({
      title: book2.title,
      release: book2.release,
      abstract: book2.abstract,
      publisherId: book2.publisherId,
    });

    const { books, total, currentPage } = await listAllBooksUseCase.execute({
      page: 1,
      elements: 7,
    });

    expect(books).toHaveLength(2);
    expect(total).toEqual(2);
    expect(currentPage).toEqual(1);
  });

  it("should be able to call method list", async () => {
    const allBooks = await listAllBooksUseCase.execute({
      page: 1,
      elements: 7,
    });

    expect(allBooks).not.toBeInstanceOf(AppError);
  });
});
