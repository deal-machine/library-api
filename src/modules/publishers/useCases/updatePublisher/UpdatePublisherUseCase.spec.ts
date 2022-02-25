import { PublishersRepositoryInMemory } from "@modules/publishers/repositories/inMemory/PublishersRepositoryInMemory";
import { IPublishersRepository } from "@modules/publishers/repositories/IPublishersRepository";
import { AppError } from "@shared/errors/AppError";
import { CreatePublisherUseCase } from "../createPublisher/CreatePublisherUseCase";
import { UpdatePublisherUseCase } from "./UpdatePublisherUseCase";

let publishersRepository: IPublishersRepository;
let createPublisherUseCase: CreatePublisherUseCase;
let updatePublisherUseCase: UpdatePublisherUseCase;

describe("Update Publisher", () => {
  beforeEach(() => {
    publishersRepository = new PublishersRepositoryInMemory();

    createPublisherUseCase = new CreatePublisherUseCase(publishersRepository);
    updatePublisherUseCase = new UpdatePublisherUseCase(publishersRepository);
  });

  it("should be able to update a Publisher", async () => {
    const publisher = await createPublisherUseCase.execute({
      description: "Created description",
    });

    await updatePublisherUseCase.execute(Number(publisher.id), {
      description: "UpdatedDescription",
    });

    expect(publisher.description).toMatch("UpdatedDescription");
  });

  it("should not be able to update a non existing Publisher", async () => {
    expect(async () => {
      const updatedPublisher = await updatePublisherUseCase.execute(213, {
        description: "Description test",
      });

      return updatedPublisher;
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update when description already exists", async () => {
    expect(async () => {
      const publisher = await createPublisherUseCase.execute({
        description: "Desc test",
      });

      const publisher2 = await createPublisherUseCase.execute({
        description: publisher.description,
      });

      return publisher2;
    }).rejects.toBeInstanceOf(AppError);
  });
});
