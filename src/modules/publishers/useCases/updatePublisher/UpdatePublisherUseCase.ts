import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import {
  IPublishersRepository,
  PublisherAttributes,
} from "@modules/publishers/repositories/IPublishersRepository";

import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdatePublisherUseCase {
  constructor(
    @inject("PublishersRepository")
    private publishersRepository: IPublishersRepository
  ) {}

  async execute(
    id: number,
    { description }: PublisherAttributes
  ): Promise<void> {
    const publisher = await this.publishersRepository.findById(id);
    if (!publisher) throw new AppError("Publisher not found.", 404);

    const publisherDescriptionAlreadyExists =
      await this.publishersRepository.findByDescription(description);
    if (publisherDescriptionAlreadyExists)
      throw new AppError("Publisher description already exists.", 406);

    const isPublisherUpdated = await this.publishersRepository.update(
      publisher,
      { description }
    );

    if (!isPublisherUpdated)
      throw new AppError("Cannot update publisher.", 406);
  }
}

export { UpdatePublisherUseCase };
