import {
  IPublishersRepository,
  ListPublishersParams,
  PublisherAttributes,
} from "../IPublishersRepository";
import { PublisherInMemory } from "./PublisherInMemory";
import { PaginationProps } from "@pagination/types";

class PublishersRepositoryInMemory implements IPublishersRepository {
  publishers: PublisherInMemory[] = [];

  async create({
    description,
  }: PublisherAttributes): Promise<PublisherInMemory> {
    const publisher = new PublisherInMemory();

    Object.assign(publisher, { description });

    this.publishers.push(publisher);

    return publisher;
  }

  async list({
    page,
    elements,
  }: PaginationProps): Promise<ListPublishersParams> {
    const allPublishers = this.publishers;

    return { publishers: allPublishers, total: allPublishers.length };
  }

  async findById(id: number): Promise<PublisherInMemory> {
    const publisher = this.publishers.find((pub) => pub.id === id);

    return publisher;
  }

  async findByDescription(description: string): Promise<PublisherInMemory> {
    const publisher = this.publishers.find(
      (pub) => pub.description === description
    );

    return publisher;
  }

  async update(
    publisher: PublisherInMemory,
    { description }: PublisherAttributes
  ): Promise<boolean> {
    publisher.description = description;

    return true;
  }

  async delete(id: number): Promise<void> {
    this.publishers.map((pub, index) => {
      if (pub.id === id) this.publishers.splice(index, 1);
    });
  }
}

export { PublishersRepositoryInMemory };
