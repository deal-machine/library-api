import { PublishersRepositoryInMemory } from "@modules/publishers/repositories/inMemory/PublishersRepositoryInMemory";
import { IPublishersRepository } from "@modules/publishers/repositories/IPublishersRepository";
import { CreatePublisherUseCase } from "../createPublisher/CreatePublisherUseCase";
import { ShowPublisherUseCase } from "../showPublisher/ShowPublisherUseCase";
import { DeletePublisherUseCase } from "./DeletePublisherUseCase";

import { AppError } from "@shared/errors/AppError";

let publishersRepository: IPublishersRepository;
let createPublisherUseCase: CreatePublisherUseCase;
let showPublisherUseCase: ShowPublisherUseCase;
let deletePubliherUseCase: DeletePublisherUseCase;

describe("Delete Publisher", () => {
  beforeEach(() => {
    publishersRepository = new PublishersRepositoryInMemory();
    createPublisherUseCase = new CreatePublisherUseCase(publishersRepository);
    showPublisherUseCase = new ShowPublisherUseCase(publishersRepository);
    deletePubliherUseCase = new DeletePublisherUseCase(publishersRepository);
  });

  it("should be able to delete a Publisher", async () => {
    expect(async () => {
      const newPubliher = await createPublisherUseCase.execute({
        description: "New Description",
      });

      await deletePubliherUseCase.execute(Number(newPubliher.id));
    }).not.toBeInstanceOf(AppError);
  });

  it("should not be able to delete a non existing Publisher", async () => {
    expect(async () => {
      await deletePubliherUseCase.execute(123);
    }).rejects.toBeInstanceOf(AppError);
  });
});
