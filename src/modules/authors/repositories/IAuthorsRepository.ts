import { Author } from "@shared/infra/sequelize/models";
import { PaginationProps } from "@pagination/types";

interface AuthorsAttributes {
  name: string;
  namePublication: string;
}

interface ListAuthorsParams {
  authors: Author[];
  currentPage?: number;
  total: number;
}

interface IAuthorsRepository {
  list({ page, elements }: PaginationProps): Promise<ListAuthorsParams>;

  findById(id: number): Promise<Author>;

  findByName(name: string): Promise<Author>;

  create({ name, namePublication }: AuthorsAttributes): Promise<Author>;

  update(
    author: Author,
    { name, namePublication }: AuthorsAttributes
  ): Promise<boolean>;

  delete(id: number): Promise<boolean>;
}

export { IAuthorsRepository, AuthorsAttributes, ListAuthorsParams };
