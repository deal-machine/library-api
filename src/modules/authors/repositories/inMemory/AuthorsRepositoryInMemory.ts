import { AuthorInMemory } from "./AuthorInMemory";

import {
  IAuthorsRepository,
  AuthorsAttributes,
  ListAuthorsParams,
} from "../IAuthorsRepository";
import { PaginationProps } from "@pagination/types";

class AuthorsRepositoryInMemory implements IAuthorsRepository {
  authors: AuthorInMemory[] = [];

  async list({ page, elements }: PaginationProps): Promise<ListAuthorsParams> {
    const allAuthors = this.authors;

    return { authors: allAuthors, total: allAuthors.length };
  }

  async findById(id: number): Promise<AuthorInMemory> {
    const author = await this.authors.find((author) => author.id === id);

    return author;
  }

  async findByName(name: string): Promise<AuthorInMemory> {
    const author = await this.authors.find((author) => author.name === name);

    return author;
  }

  async create({
    name,
    namePublication,
  }: AuthorsAttributes): Promise<AuthorInMemory> {
    const author = new AuthorInMemory();

    Object.assign(author, { name, namePublication });

    this.authors.push(author);

    return author;
  }

  async update(
    author: AuthorInMemory,
    { name, namePublication }: AuthorsAttributes
  ): Promise<boolean> {
    author.name = name;
    author.namePublication = namePublication;

    return true;
  }

  async delete(id: number): Promise<boolean> {
    this.authors.filter((value, index) => {
      if (value.id === id) this.authors.splice(index, 1);
    });

    return true;
  }
}

export { AuthorsRepositoryInMemory };
