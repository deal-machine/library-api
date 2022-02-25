import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { IPublishersRepository } from "@modules/publishers/repositories/IPublishersRepository";

import { AppError } from "@shared/errors/AppError";

@injectable()
class DeletePublisherUseCase {
  constructor(
    @inject("PublishersRepository")
    private publishersRepository: IPublishersRepository
  ) {}

  async execute(id: number): Promise<void> {
    const publisher = await this.publishersRepository.findById(id);

    if (!publisher) throw new AppError("Publisher not foud.", 404);

    await this.publishersRepository.delete(publisher.id);
  }
}

export { DeletePublisherUseCase };
