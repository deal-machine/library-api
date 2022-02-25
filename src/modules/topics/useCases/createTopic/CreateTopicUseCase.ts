import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { Topic } from "@database/models";
import {
  ITopicsRepository,
  TopicAttributes,
} from "@modules/topics/repositories/ITopicsRepository";

import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateTopicUseCase {
  constructor(
    @inject("TopicsRepository")
    private topicsRepository: ITopicsRepository
  ) {}

  async execute({ description }: TopicAttributes): Promise<Topic> {
    const isTopicDescriptionExists =
      await this.topicsRepository.findByDescription(description);

    if (isTopicDescriptionExists)
      throw new AppError("Topic description already exists.", 406);

    const newTopic = await this.topicsRepository.create({ description });

    if (!newTopic) throw new AppError("Cannot create topic.", 400);

    return newTopic;
  }
}

export { CreateTopicUseCase };
