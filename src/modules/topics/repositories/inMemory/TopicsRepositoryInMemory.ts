import {
  ITopicsRepository,
  ListTopicsParams,
  TopicAttributes,
} from "../ITopicsRepository";
import { TopicInMemory } from "./TopicInMemory";
import { PaginationProps } from "@pagination/types";

class TopicsRepositoryInMemory implements ITopicsRepository {
  topics: TopicInMemory[] = [];

  async create({ description }: TopicAttributes): Promise<TopicInMemory> {
    const topic = new TopicInMemory();

    Object.assign(topic, { description });

    this.topics.push(topic);

    return topic;
  }

  async findManyIds(ids: []): Promise<TopicInMemory[]> {
    const topics = this.topics.filter((t) => {
      ids.map((item) => t.id === item);
    });
    return topics;
  }

  async findByDescription(description: string): Promise<TopicInMemory> {
    const topic = this.topics.find((tpc) => tpc.description === description);

    return topic;
  }

  async findById(id: number): Promise<TopicInMemory> {
    const topic = this.topics.find((tpc) => tpc.id === id);

    return topic;
  }

  async list({ page, elements }: PaginationProps): Promise<ListTopicsParams> {
    const allTopics = this.topics;

    return { topics: allTopics, total: allTopics.length };
  }

  async update(
    topic: TopicInMemory,
    { description }: TopicAttributes
  ): Promise<boolean> {
    topic.description = description;

    return true;
  }

  async delete(id: number): Promise<void> {
    this.topics.map((topic, index) => {
      if (topic.id === id) this.topics.splice(index, 1);
    });
  }
}

export { TopicsRepositoryInMemory };
