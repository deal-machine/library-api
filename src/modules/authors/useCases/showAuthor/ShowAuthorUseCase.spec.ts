import {
  AuthorsAttributes,
  IAuthorsRepository,
} from "@modules/authors/repositories/IAuthorsRepository";
import { AuthorsRepository } from "@modules/authors/repositories/implementations/AuthorsRepository";
import { AuthorsRepositoryInMemory } from "@modules/authors/repositories/inMemory/AuthorsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateAuthorUseCase } from "../createAuthor/CreateAuthorUseCase";
import { ShowAuthorUseCase } from "./ShowAuthorUseCase";

let authorsRepository: IAuthorsRepository;
let showAuthorUseCase: ShowAuthorUseCase;
let createAuthorUseCase: CreateAuthorUseCase;

describe("Show Author", () => {
  beforeEach(() => {
    authorsRepository = new AuthorsRepositoryInMemory();
    createAuthorUseCase = new CreateAuthorUseCase(authorsRepository);
    showAuthorUseCase = new ShowAuthorUseCase(authorsRepository);
  });

  it("should be able to show an author", async () => {
    const author: AuthorsAttributes = {
      name: "Name Test to Show",
      namePublication: "Name publications Test",
    };

    const newAuthor = await createAuthorUseCase.execute({
      name: author.name,
      namePublication: author.namePublication,
    });

    const authorFound = await showAuthorUseCase.execute(newAuthor.id);

    expect(authorFound).toHaveProperty("id", newAuthor.id);
  });

  it("should not be able to find a not exist author", async () => {
    await expect(async () => {
      const authorFound = await showAuthorUseCase.execute(123);

      return authorFound;
    }).rejects.toBeInstanceOf(AppError);
  });
});
