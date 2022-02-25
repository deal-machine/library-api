import {
  AuthorsAttributes,
  IAuthorsRepository,
} from "@modules/authors/repositories/IAuthorsRepository";
import { PaginationProps } from "@pagination/types";

// import { AuthorsRepository } from "@modules/authors/repositories/implementations/AuthorsRepository";
import { AuthorsRepositoryInMemory } from "@modules/authors/repositories/inMemory/AuthorsRepositoryInMemory";

import { CreateAuthorUseCase } from "../createAuthor/CreateAuthorUseCase";
import { ListAllAuthorsUseCase } from "./ListAllAuthorUseCase";

import { AppError } from "@shared/errors/AppError";

let authorsRepository: IAuthorsRepository;
let listAllAuthorsUseCase: ListAllAuthorsUseCase;
let createAuthorUseCase: CreateAuthorUseCase;

describe("List All Authors", () => {
  beforeEach(() => {
    authorsRepository = new AuthorsRepositoryInMemory();
    createAuthorUseCase = new CreateAuthorUseCase(authorsRepository);
    listAllAuthorsUseCase = new ListAllAuthorsUseCase(authorsRepository);
  });

  it("should be able to list all authors", async () => {
    const author1: AuthorsAttributes = {
      name: "Name author 1 Test to List",
      namePublication: "Name Publication author 1 Test",
    };
    const author2: AuthorsAttributes = {
      name: "Name author 2 Test to List",
      namePublication: "Name Publication author 2 Test",
    };
    const author3: AuthorsAttributes = {
      name: "Name author 3 Test to List",
      namePublication: "Name Publication author 2 Test",
    };

    await createAuthorUseCase.execute(author1);
    await createAuthorUseCase.execute(author2);
    await createAuthorUseCase.execute(author3);

    const { authors, total, currentPage } = await listAllAuthorsUseCase.execute(
      { page: 1, elements: 7 }
    );

    expect(authors).toHaveLength(3);
    expect(total).toEqual(3);
    expect(currentPage).toEqual(1);
  });

  it("should be able to call list method", async () => {
    const allAuthors = await listAllAuthorsUseCase.execute({
      page: 1,
      elements: 7,
    });

    expect(allAuthors).not.toBeInstanceOf(AppError);
  });
});
