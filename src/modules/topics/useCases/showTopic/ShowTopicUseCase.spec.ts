import { TopicsRepositoryInMemory } from "@modules/topics/repositories/inMemory/TopicsRepositoryInMemory";
import { ITopicsRepository } from "@modules/topics/repositories/ITopicsRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateTopicUseCase } from "../createTopic/CreateTopicUseCase";
import { ShowTopicUseCase } from "./ShowTopicUseCase";

let topicsRepository: ITopicsRepository;
let createTopicUseCase: CreateTopicUseCase;
let showTopicUseCase: ShowTopicUseCase;

describe("Show Topic", () => {
  beforeEach(() => {
    topicsRepository = new TopicsRepositoryInMemory();
    createTopicUseCase = new CreateTopicUseCase(topicsRepository);
    showTopicUseCase = new ShowTopicUseCase(topicsRepository);
  });

  it("should be able to show a topic", async () => {
    const newTopic = await createTopicUseCase.execute({
      description: "New description Testing",
    });

    const foundTopic = await showTopicUseCase.execute(Number(newTopic.id));

    expect(foundTopic).toHaveProperty("id");
  });

  it("should not be able to show a non existing topic", async () => {
    expect(async () => {
      const foundTopic = await showTopicUseCase.execute(123);
      return foundTopic;
    }).rejects.toBeInstanceOf(AppError);
  });
});
