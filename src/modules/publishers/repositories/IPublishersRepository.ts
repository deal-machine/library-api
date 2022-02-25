import { Publisher } from "@database/models";
import { PaginationProps } from "@pagination/types";

interface PublisherAttributes {
  description: string;
}

interface ListPublishersParams {
  publishers: Publisher[];
  currentPage?: number;
  total: number;
}

interface IPublishersRepository {
  create({ description }: PublisherAttributes): Promise<Publisher>;

  list({ page, elements }: PaginationProps): Promise<ListPublishersParams>;

  findById(id: number): Promise<Publisher>;

  findByDescription(description: string): Promise<Publisher>;

  update(
    publisher: Publisher,
    { description }: PublisherAttributes
  ): Promise<boolean>;

  delete(id: number): Promise<void>;
}

export { IPublishersRepository, PublisherAttributes, ListPublishersParams };
