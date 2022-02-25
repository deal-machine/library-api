import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { Topic } from "@database/models";
import { ITopicsRepository } from "@modules/topics/repositories/ITopicsRepository";

import { AppError } from "@shared/errors/AppError";

@injectable()
class ShowTopicUseCase {
  constructor(
    @inject("TopicsRepository")
    private topicsRepository: ITopicsRepository
  ) {}

  async execute(id: number): Promise<Topic> {
    const topic = await this.topicsRepository.findById(id);

    if (!topic) throw new AppError("Topic not found.", 404);

    return topic;
  }
}
export { ShowTopicUseCase };
