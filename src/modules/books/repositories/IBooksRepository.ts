import { Book } from "@shared/infra/sequelize/models";
import { PaginationProps } from "@pagination/types";

interface BookAttributes {
  title: string;
  abstract: string;
  release: Date;
  publisherId?: number;
}

interface ListBooksParams {
  books: Book[];
  currentPage?: number;
  total: number;
}

interface IBooksRepository {
  findById(id: number): Promise<Book>;

  findByTitle(title: string): Promise<Book>;

  list({ page, elements }: PaginationProps): Promise<ListBooksParams>;

  create({
    title,
    abstract,
    release,
    publisherId,
  }: BookAttributes): Promise<Book>;

  update(
    book: Book,
    { title, abstract, release }: BookAttributes
  ): Promise<boolean>;

  delete(id: number): Promise<void>;
}

export { IBooksRepository, BookAttributes, ListBooksParams };
