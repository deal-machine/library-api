import { TopicsRepositoryInMemory } from "@modules/topics/repositories/inMemory/TopicsRepositoryInMemory";
import { ITopicsRepository } from "@modules/topics/repositories/ITopicsRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateTopicUseCase } from "../createTopic/CreateTopicUseCase";
import { ListAllTopicsUseCase } from "./ListAllTopicsUseCase";

let listAllTopicsUseCase: ListAllTopicsUseCase;
let createTopicUseCase: CreateTopicUseCase;
let topicsRepository: ITopicsRepository;

describe("List All Topics", () => {
  beforeEach(() => {
    topicsRepository = new TopicsRepositoryInMemory();
    createTopicUseCase = new CreateTopicUseCase(topicsRepository);
    listAllTopicsUseCase = new ListAllTopicsUseCase(topicsRepository);
  });

  it("should be able to list all topics", async () => {
    const newTopic = await createTopicUseCase.execute({
      description: "new description",
    });

    const newTopic2 = await createTopicUseCase.execute({
      description: "new description2",
    });

    const { topics, total, currentPage } = await listAllTopicsUseCase.execute({
      page: 1,
      elements: 7,
    });

    expect(topics).toHaveLength(2);
    expect(total).toEqual(2);
    expect(currentPage).toEqual(1);
  });

  it("should be able to call list method", async () => {
    const { topics } = await listAllTopicsUseCase.execute({
      page: 1,
      elements: 7,
    });

    expect(topics).not.toBeInstanceOf(AppError);
  });
});
