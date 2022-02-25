import { Book, Topic, Publisher } from "@shared/infra/sequelize/models";
import {
  BookAttributes,
  IBooksRepository,
  ListBooksParams,
} from "../IBooksRepository";
import { PaginationProps } from "@pagination/types";

class BooksRepository implements IBooksRepository {
  async findById(id: number): Promise<Book> {
    const bookR = await Book.findOne({
      where: { id },
      // include: [{ model: Topic, as: "topics" }, { model: Publisher }],
    });

    return bookR;
  }

  async findByTitle(title: string): Promise<Book> {
    const book = await Book.findOne({ where: { title } });

    return book;
  }

  async list({ page, elements }: PaginationProps): Promise<ListBooksParams> {
    const { count, rows } = await Book.findAndCountAll({
      offset: page,
      limit: elements,
    });

    return { books: rows, total: count };
  }

  async create({
    title,
    abstract,
    release,
    publisherId,
  }: BookAttributes): Promise<Book> {
    const book = await Book.create({ title, abstract, release, publisherId });

    return book;
  }

  async update(
    book: Book,
    { title, abstract, release }: BookAttributes
  ): Promise<boolean> {
    const isBookUpdated = await book.update({ title, abstract, release });

    return isBookUpdated;
  }

  async delete(id: number): Promise<void> {
    await Book.destroy({ where: { id } });
  }
}

export { BooksRepository };
