import { TopicsRepositoryInMemory } from "@modules/topics/repositories/inMemory/TopicsRepositoryInMemory";
import { ITopicsRepository } from "@modules/topics/repositories/ITopicsRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateTopicUseCase } from "../createTopic/CreateTopicUseCase";
import { UpdateTopicUseCase } from "./UpdateTopicUseCase";

let topicsRepository: ITopicsRepository;
let createTopicUseCase: CreateTopicUseCase;
let updateTopicUseCase: UpdateTopicUseCase;

describe("Update Topic", () => {
  beforeEach(() => {
    topicsRepository = new TopicsRepositoryInMemory();
    createTopicUseCase = new CreateTopicUseCase(topicsRepository);
    updateTopicUseCase = new UpdateTopicUseCase(topicsRepository);
  });

  it("should be able to update a topic", async () => {
    expect(async () => {
      const newTopic = await createTopicUseCase.execute({
        description: "New Description Update Test",
      });

      await updateTopicUseCase.execute(Number(newTopic.id), {
        description: "Updated Description",
      });
    }).not.toBeInstanceOf(AppError);
  });

  it("should not be able to update a non existing topic", async () => {
    expect(async () => {
      await updateTopicUseCase.execute(123, { description: "Test Desc" });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update a topic when description already exists", async () => {
    expect(async () => {
      const newTopic = await createTopicUseCase.execute({
        description: "New Description Update Test",
      });

      await updateTopicUseCase.execute(Number(newTopic.id), {
        description: "New Description Update Test",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
