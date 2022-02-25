import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { Book } from "@shared/infra/sequelize/models";
import {
  IBooksRepository,
  ListBooksParams,
} from "../../repositories/IBooksRepository";
import { PaginationProps } from "@pagination/types";

import { AppError } from "@shared/errors/AppError";

@injectable()
class ListAllBooksUseCase {
  constructor(
    @inject("BooksRepository")
    private booksRepository: IBooksRepository
  ) {}
  async execute({ page, elements }: PaginationProps): Promise<ListBooksParams> {
    let offset = (page - 1) * elements;
    if (page == 1) offset = 0;

    const { books, total } = await this.booksRepository.list({
      page: offset,
      elements,
    });

    if (!books) throw new AppError("Books not found.", 404);

    return { books, total, currentPage: page };
  }
}

export { ListAllBooksUseCase };
