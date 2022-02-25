import { Author } from "@shared/infra/sequelize/models";
import {
  IAuthorsRepository,
  AuthorsAttributes,
  ListAuthorsParams,
} from "../IAuthorsRepository";
import { PaginationProps } from "@pagination/types";

class AuthorsRepository implements IAuthorsRepository {
  //list all
  async list({ page, elements }: PaginationProps): Promise<ListAuthorsParams> {
    const authors = await Author.findAndCountAll({
      offset: page,
      limit: elements,
      order: ["name"],
    });
    return { authors: authors.rows, total: authors.count };
  }

  async findById(id: number): Promise<Author> {
    const author = await Author.findByPk(id);

    return author;
  }

  async findByName(name: string): Promise<Author> {
    const author = await Author.findOne({ where: { name } });

    return author;
  }

  async create(author: AuthorsAttributes): Promise<Author> {
    const newAuthor = await Author.create(author);
    return newAuthor;
  }

  async update(
    author: Author,
    { name, namePublication }: AuthorsAttributes
  ): Promise<boolean> {
    return await author.update({ name, namePublication });
  }

  async delete(id: number): Promise<boolean> {
    return await Author.destroy({ where: { id } });
  }
}

export { AuthorsRepository };
