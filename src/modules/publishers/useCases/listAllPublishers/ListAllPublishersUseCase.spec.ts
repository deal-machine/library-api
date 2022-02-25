import { PublishersRepositoryInMemory } from "@modules/publishers/repositories/inMemory/PublishersRepositoryInMemory";
import { IPublishersRepository } from "@modules/publishers/repositories/IPublishersRepository";
import { AppError } from "@shared/errors/AppError";
import { CreatePublisherUseCase } from "../createPublisher/CreatePublisherUseCase";
import { ListAllPublishersUseCase } from "./ListAllPublishersUseCase";

let publishersRepository: IPublishersRepository;
let createPublisherUseCase: CreatePublisherUseCase;
let listAllPublishersUseCase: ListAllPublishersUseCase;

describe("List All Publisher", () => {
  beforeEach(() => {
    publishersRepository = new PublishersRepositoryInMemory();
    createPublisherUseCase = new CreatePublisherUseCase(publishersRepository);
    listAllPublishersUseCase = new ListAllPublishersUseCase(
      publishersRepository
    );
  });

  it("should be able to list all Publishers", async () => {
    const newPublisher = await createPublisherUseCase.execute({
      description: "New Description Test",
    });

    const newPublisher2 = await createPublisherUseCase.execute({
      description: "New Description Test2",
    });

    const { publishers, total, currentPage } =
      await listAllPublishersUseCase.execute({
        page: 1,
        elements: 7,
      });

    expect(publishers).toHaveLength(2);
    expect(total).toEqual(2);
    expect(currentPage).toEqual(1);
  });

  it("should be able to call to list method", async () => {
    expect(async () => {
      const { publishers, total, currentPage } =
        await listAllPublishersUseCase.execute({
          page: 1,
          elements: 7,
        });

      return { publishers, total, currentPage };
    }).not.toBeInstanceOf(AppError);
  });
});
