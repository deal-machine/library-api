import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { Publisher } from "@database/models";
import { IPublishersRepository } from "@modules/publishers/repositories/IPublishersRepository";

import { AppError } from "@shared/errors/AppError";

@injectable()
class ShowPublisherUseCase {
  constructor(
    @inject("PublishersRepository")
    private publishersRepository: IPublishersRepository
  ) {}

  async execute(id: number): Promise<Publisher> {
    const publisher = await this.publishersRepository.findById(id);

    if (!publisher) throw new AppError("Publisher not found.", 404);

    return publisher;
  }
}

export { ShowPublisherUseCase };
