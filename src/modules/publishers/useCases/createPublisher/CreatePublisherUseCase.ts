import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { Publisher } from "@database/models";
import {
  IPublishersRepository,
  PublisherAttributes,
} from "@modules/publishers/repositories/IPublishersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreatePublisherUseCase {
  constructor(
    @inject("PublishersRepository")
    private publishersRepository: IPublishersRepository
  ) {}

  async execute({ description }: PublisherAttributes): Promise<Publisher> {
    const publisher = await this.publishersRepository.findByDescription(
      description
    );
    if (publisher)
      throw new AppError("Publisher Description Already Exists", 406);

    const newPublisher = await this.publishersRepository.create({
      description,
    });
    if (!newPublisher)
      throw new AppError("Cannot create a new publisher.", 406);

    return newPublisher;
  }
}
export { CreatePublisherUseCase };
