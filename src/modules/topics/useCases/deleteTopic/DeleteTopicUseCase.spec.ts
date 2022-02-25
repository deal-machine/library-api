import { TopicsRepositoryInMemory } from "@modules/topics/repositories/inMemory/TopicsRepositoryInMemory";
import { ITopicsRepository } from "@modules/topics/repositories/ITopicsRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateTopicUseCase } from "../createTopic/CreateTopicUseCase";
import { ShowTopicUseCase } from "../showTopic/ShowTopicUseCase";
import { DeleteTopicUseCase } from "./DeleteTopicUseCase";

let createTopicUseCase: CreateTopicUseCase;
let showTopicUseCase: ShowTopicUseCase;
let deleteTopicUseCase: DeleteTopicUseCase;
let topicsRepository: ITopicsRepository;

describe("Delete Topic", () => {
  beforeEach(() => {
    topicsRepository = new TopicsRepositoryInMemory();

    createTopicUseCase = new CreateTopicUseCase(topicsRepository);
    showTopicUseCase = new ShowTopicUseCase(topicsRepository);
    deleteTopicUseCase = new DeleteTopicUseCase(topicsRepository);
  });

  it("should be able to delete a topic", async () => {
    expect(async () => {
      const newTopic = await createTopicUseCase.execute({
        description: "New Description Test",
      });

      await deleteTopicUseCase.execute(Number(newTopic.id));

      const deletedTopic = await showTopicUseCase.execute(Number(newTopic.id));

      return deletedTopic;
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to delete non existing topic", async () => {
    expect(async () => {
      await deleteTopicUseCase.execute(123);
    }).rejects.toBeInstanceOf(AppError);
  });
});
