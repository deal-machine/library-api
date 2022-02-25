import { Topic } from "@database/models";
import { Op } from "sequelize";
import {
  ITopicsRepository,
  TopicAttributes,
  ListTopicsParams,
} from "../ITopicsRepository";
import { PaginationProps } from "@pagination/types";

class TopicsRepository implements ITopicsRepository {
  async create({ description }: TopicAttributes): Promise<Topic> {
    const topic = await Topic.create({ description });

    return topic;
  }

  async findById(id: number): Promise<Topic> {
    const topic = await Topic.findOne({ where: { id } });
    return topic;
  }

  async findManyIds(ids: []): Promise<Topic[]> {
    const topics = await Topic.findAll({ where: { id: { [Op.or]: [ids] } } });
    return topics;
  }

  async findByDescription(description: string): Promise<Topic> {
    const topic = await Topic.findOne({ where: { description } });
    return topic;
  }

  async list({ page, elements }: PaginationProps): Promise<ListTopicsParams> {
    const { count, rows } = await Topic.findAndCountAll({
      offset: page,
      limit: elements,
      order: ["description"],
    });

    return { topics: rows, total: count };
  }

  async update(
    topic: Topic,
    { description }: TopicAttributes
  ): Promise<boolean> {
    await topic.update({ description });

    return true;
  }

  async delete(id: number): Promise<void> {
    await Topic.destroy({ where: { id } });
  }
}

export { TopicsRepository };
