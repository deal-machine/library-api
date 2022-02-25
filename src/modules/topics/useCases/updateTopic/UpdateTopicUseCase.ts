import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import {
  ITopicsRepository,
  TopicAttributes,
} from "@modules/topics/repositories/ITopicsRepository";

import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateTopicUseCase {
  constructor(
    @inject("TopicsRepository")
    private topicsRepository: ITopicsRepository
  ) {}

  async execute(id: number, { description }: TopicAttributes): Promise<void> {
    const isTopicExists = await this.topicsRepository.findById(id);

    if (!isTopicExists) throw new AppError("Topic not found.", 404);

    const topicDescriptionAlreadyExists =
      await this.topicsRepository.findByDescription(description);

    if (topicDescriptionAlreadyExists)
      throw new AppError("Topic Description Already Exists", 406);

    const updatedTopic = await this.topicsRepository.update(isTopicExists, {
      description,
    });

    if (!updatedTopic) throw new AppError("Cannot update topic.", 406);
  }
}

export { UpdateTopicUseCase };
