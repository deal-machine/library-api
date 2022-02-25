import { AppError } from "@shared/errors/AppError";
import { CreateAuthorUseCase } from "./CreateAuthorUseCase";
import { AuthorsRepositoryInMemory } from "../../repositories/inMemory/AuthorsRepositoryInMemory";
import {
  AuthorsAttributes,
  IAuthorsRepository,
} from "@modules/authors/repositories/IAuthorsRepository";
import { AuthorsRepository } from "@modules/authors/repositories/implementations/AuthorsRepository";

let createAuthor: CreateAuthorUseCase;
let authorsRepositoryInMemory: IAuthorsRepository;

describe("Create Author", () => {
  beforeEach(() => {
    authorsRepositoryInMemory = new AuthorsRepositoryInMemory();
    createAuthor = new CreateAuthorUseCase(authorsRepositoryInMemory);
  });

  it("should be able to create a new author", async () => {
    const author: AuthorsAttributes = {
      name: "Author Name Test to Create",
      namePublication: "Author Name Publication Test",
    };

    const newAuthor = await createAuthor.execute({
      name: author.name,
      namePublication: author.namePublication,
    });

    expect(newAuthor).toHaveProperty("id");
  });

  it("should not be able to create a new author when name already exists", async () => {
    expect(async () => {
      const author = {
        name: "Creating Author Name Test",
        namePublication: "Author Name Publication Test",
      };

      await createAuthor.execute({
        name: author.name,
        namePublication: author.namePublication,
      });
      await createAuthor.execute({
        name: author.name,
        namePublication: author.namePublication,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
