import { Publisher } from "@database/models";
import {
  IPublishersRepository,
  ListPublishersParams,
  PublisherAttributes,
} from "../IPublishersRepository";
import { PaginationProps } from "@pagination/types";

class PublishersRepository implements IPublishersRepository {
  async create({ description }: PublisherAttributes): Promise<Publisher> {
    const publisher = await Publisher.create({ description });

    return publisher;
  }

  async list({
    page,
    elements,
  }: PaginationProps): Promise<ListPublishersParams> {
    const { count, rows } = await Publisher.findAndCountAll({
      offset: page,
      limit: elements,
      order: ["descricao"],
    });

    return { publishers: rows, total: count };
  }

  async findById(id: number): Promise<Publisher> {
    const publisher = await Publisher.findOne({ where: { id } });

    return publisher;
  }

  async findByDescription(description: string): Promise<Publisher> {
    const publisher = await Publisher.findOne({ where: { description } });

    return publisher;
  }

  async update(
    publisher: Publisher,
    { description }: PublisherAttributes
  ): Promise<boolean> {
    await publisher.update({ description });
    return true;
  }

  async delete(id: number): Promise<void> {
    await Publisher.destroy({ where: { id } });
  }
}

export { PublishersRepository };
