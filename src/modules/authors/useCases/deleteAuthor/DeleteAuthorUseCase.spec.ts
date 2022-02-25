import {
  AuthorsAttributes,
  IAuthorsRepository,
} from "@modules/authors/repositories/IAuthorsRepository";
import { AuthorsRepository } from "@modules/authors/repositories/implementations/AuthorsRepository";
import { AuthorsRepositoryInMemory } from "@modules/authors/repositories/inMemory/AuthorsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateAuthorUseCase } from "../createAuthor/CreateAuthorUseCase";
import { ShowAuthorUseCase } from "../showAuthor/ShowAuthorUseCase";
import { DeleteAuthorUseCase } from "./DeleteAuthorUseCase";

let authorsRepository: IAuthorsRepository;
let createAuthorUseCase: CreateAuthorUseCase;
let showAuthorUseCase: ShowAuthorUseCase;
let deleteAuthorUseCase: DeleteAuthorUseCase;

describe("Delete Author", () => {
  beforeEach(() => {
    authorsRepository = new AuthorsRepositoryInMemory();

    createAuthorUseCase = new CreateAuthorUseCase(authorsRepository);
    showAuthorUseCase = new ShowAuthorUseCase(authorsRepository);
    deleteAuthorUseCase = new DeleteAuthorUseCase(authorsRepository);
  });

  it("should be able to delete an author", async () => {
    expect(async () => {
      const author: AuthorsAttributes = {
        name: "Name Test to Delete",
        namePublication: "Name Publication Test",
      };

      const newAuthor = await createAuthorUseCase.execute({
        name: author.name,
        namePublication: author.namePublication,
      });

      await deleteAuthorUseCase.execute(Number(newAuthor.id));

      const deletedAuthor = await showAuthorUseCase.execute(
        Number(newAuthor.id)
      );

      return deletedAuthor;
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to delete a not exists author", async () => {
    expect(async () => {
      await deleteAuthorUseCase.execute(123);
    }).rejects.toBeInstanceOf(AppError);
  });
});
