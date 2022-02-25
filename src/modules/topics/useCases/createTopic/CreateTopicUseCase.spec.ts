import { TopicsRepositoryInMemory } from "@modules/topics/repositories/inMemory/TopicsRepositoryInMemory";
import {
  ITopicsRepository,
  TopicAttributes,
} from "@modules/topics/repositories/ITopicsRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateTopicUseCase } from "./CreateTopicUseCase";

let topicsRepository: ITopicsRepository;
let createTopicUseCase: CreateTopicUseCase;

describe("Create Topic", () => {
  beforeEach(() => {
    topicsRepository = new TopicsRepositoryInMemory();
    createTopicUseCase = new CreateTopicUseCase(topicsRepository);
  });

  it("should be able to create a new topic", async () => {
    const topic: TopicAttributes = {
      description: "Description Test",
    };

    const newTopic = await createTopicUseCase.execute({
      description: topic.description,
    });

    expect(newTopic).toHaveProperty("id");
  });

  it("should not be able to create a topic when description already exists", async () => {
    try {
      await createTopicUseCase.execute({
        description: "Test Description",
      });

      const newTopic = await createTopicUseCase.execute({
        description: "Test Description",
      });

      expect(newTopic).not.toHaveProperty("id");
    } catch (e) {
      expect(e).toBeInstanceOf(AppError);
    }
  });
});
