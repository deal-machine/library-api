import { PublishersRepositoryInMemory } from "@modules/publishers/repositories/inMemory/PublishersRepositoryInMemory";
import {
  IPublishersRepository,
  PublisherAttributes,
} from "@modules/publishers/repositories/IPublishersRepository";
import { AppError } from "@shared/errors/AppError";
import { CreatePublisherUseCase } from "./CreatePublisherUseCase";

let createPublisherUseCase: CreatePublisherUseCase;
let publishersRepository: IPublishersRepository;

describe("Create Publisher", () => {
  beforeEach(() => {
    publishersRepository = new PublishersRepositoryInMemory();
    createPublisherUseCase = new CreatePublisherUseCase(publishersRepository);
  });

  it("should be able to create a new Publisher", async () => {
    const publisher: PublisherAttributes = {
      description: "New Description",
    };

    const newPublisher = await createPublisherUseCase.execute({
      description: publisher.description,
    });

    expect(newPublisher).toHaveProperty("id");
  });

  it("should not be able to create a Publisher when description already exists", async () => {
    try {
      const publisher: PublisherAttributes = {
        description: "New Description",
      };

      const newPublisher = await createPublisherUseCase.execute({
        description: publisher.description,
      });
      const newPublisher2 = await createPublisherUseCase.execute({
        description: publisher.description,
      });

      expect(newPublisher2).not.toHaveProperty("id");
    } catch (e) {
      expect(e).toBeInstanceOf(AppError);
    }
  });
});
