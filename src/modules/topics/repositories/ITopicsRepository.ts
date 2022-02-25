import { Topic } from "@database/models";
import { PaginationProps } from "@pagination/types";

interface TopicAttributes {
  description: string;
}

interface ListTopicsParams {
  topics: Topic[];
  total: number;
  currentPage?: number;
}

interface ITopicsRepository {
  create({ description }: TopicAttributes): Promise<Topic>;
  findById(id: number): Promise<Topic>;
  findManyIds(ids: []): Promise<Topic[]>;
  findByDescription(description: string): Promise<Topic>;
  list({ page, elements }: PaginationProps): Promise<ListTopicsParams>;
  update(topic: Topic, { description }: TopicAttributes): Promise<boolean>;
  delete(id: number): Promise<void>;
}

export { ITopicsRepository, TopicAttributes, ListTopicsParams };
