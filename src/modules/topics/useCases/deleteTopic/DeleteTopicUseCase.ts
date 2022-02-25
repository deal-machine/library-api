import "reflect-metadata";
import { injectable, inject } from "tsyringe";

import { ITopicsRepository } from "@modules/topics/repositories/ITopicsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteTopicUseCase {
  constructor(
    @inject("TopicsRepository")
    private topicsRepository: ITopicsRepository
  ) {}

  async execute(id: number): Promise<void> {
    const topic = await this.topicsRepository.findById(id);

    if (!topic) throw new AppError("Topic not found.", 404);

    await this.topicsRepository.delete(id);
  }
}
export { DeleteTopicUseCase };
