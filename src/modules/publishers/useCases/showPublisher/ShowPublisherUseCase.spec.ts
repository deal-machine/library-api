import { PublishersRepositoryInMemory } from "@modules/publishers/repositories/inMemory/PublishersRepositoryInMemory";
import { IPublishersRepository } from "@modules/publishers/repositories/IPublishersRepository";
import { AppError } from "@shared/errors/AppError";
import { CreatePublisherUseCase } from "../createPublisher/CreatePublisherUseCase";
import { ShowPublisherUseCase } from "./ShowPublisherUseCase";

let publishersRepository: IPublishersRepository;
let createPublisherUseCase: CreatePublisherUseCase;
let showPublisherUseCase: ShowPublisherUseCase;

describe("Show Publisher", () => {
  beforeEach(() => {
    publishersRepository = new PublishersRepositoryInMemory();
    createPublisherUseCase = new CreatePublisherUseCase(publishersRepository);
    showPublisherUseCase = new ShowPublisherUseCase(publishersRepository);
  });

  it("should be able to show a Publisher", async () => {
    const newPublisher = await createPublisherUseCase.execute({
      description: "New Description Testing",
    });

    const foundPublisher = await showPublisherUseCase.execute(
      Number(newPublisher.id)
    );

    expect(foundPublisher).toHaveProperty("id");
  });

  it("should not be able to show a non existing Publisher", async () => {
    expect(async () => {
      const publisher = await showPublisherUseCase.execute(123);

      return publisher;
    }).rejects.toBeInstanceOf(AppError);
  });
});
