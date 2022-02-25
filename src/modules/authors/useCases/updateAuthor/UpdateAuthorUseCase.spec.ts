import {
  AuthorsAttributes,
  IAuthorsRepository,
} from "@modules/authors/repositories/IAuthorsRepository";
import { AuthorsRepository } from "@modules/authors/repositories/implementations/AuthorsRepository";
import { AuthorsRepositoryInMemory } from "@modules/authors/repositories/inMemory/AuthorsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateAuthorUseCase } from "../createAuthor/CreateAuthorUseCase";
import { UpdateAuthorUseCase } from "./UpdateAuthorUseCase";

let authorsRepository: IAuthorsRepository;
let updateAuthorUseCase: UpdateAuthorUseCase;
let createAuthorUseCase: CreateAuthorUseCase;

describe("Update Author", () => {
  beforeEach(() => {
    authorsRepository = new AuthorsRepositoryInMemory();
    createAuthorUseCase = new CreateAuthorUseCase(authorsRepository);
    updateAuthorUseCase = new UpdateAuthorUseCase(authorsRepository);
  });

  it("should be able to update an author", async () => {
    const author: AuthorsAttributes = {
      name: "Name Test to Update",
      namePublication: "Name publication Test",
    };
    const newAuthor = await createAuthorUseCase.execute({
      name: author.name,
      namePublication: author.namePublication,
    });

    const updatedAuthor = await updateAuthorUseCase.execute(newAuthor.id, {
      name: "New name Updated",
      namePublication: "Name publication Updated",
    });

    expect(updatedAuthor).toHaveProperty("name", "New name Updated");
  });

  it("should not be able to update with an existing name", async () => {
    await expect(async () => {
      const newAuthor = await createAuthorUseCase.execute({
        name: "Updating with existing name",
        namePublication: "The Same Name",
      });
      const updatedAuthor = await updateAuthorUseCase.execute(newAuthor.id, {
        name: "Updating with existing name",
        namePublication: "Name publication Updated",
      });

      return updatedAuthor;
    }).rejects.toBeInstanceOf(AppError);
  });
});
