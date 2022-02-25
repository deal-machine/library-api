import {
  BookAttributes,
  IBooksRepository,
  ListBooksParams,
} from "../IBooksRepository";
import { BookInMemory } from "./BookInMemory";
import { PaginationProps } from "@pagination/types";

class BooksRepositoryInMemory implements IBooksRepository {
  books: BookInMemory[] = [];

  async findById(id: number): Promise<BookInMemory> {
    const book = this.books.find((b) => b.id === id);

    return book;
  }

  async findByTitle(title: string): Promise<BookInMemory> {
    const book = this.books.find((b) => b.title === title);

    return book;
  }

  async list({ page, elements }: PaginationProps): Promise<ListBooksParams> {
    const allBooks = this.books;

    return { books: allBooks, total: allBooks.length };
  }

  async create({
    title,
    abstract,
    release,
  }: BookAttributes): Promise<BookInMemory> {
    const book = new BookInMemory();

    Object.assign(book, { title, abstract, release });

    this.books.push(book);

    return book;
  }

  async update(
    book: BookInMemory,
    { title, abstract, release }: BookAttributes
  ): Promise<boolean> {
    book.title = title;
    book.abstract = abstract;
    book.release = release;

    return true;
  }

  async delete(id: number): Promise<void> {
    this.books.map((book, index) => {
      if (book.id === id) this.books.splice(index, 1);
    });
  }
}
export { BooksRepositoryInMemory };
