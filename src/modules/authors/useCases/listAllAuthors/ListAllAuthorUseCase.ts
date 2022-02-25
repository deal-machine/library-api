import { inject, injectable } from "tsyringe";

import {
  IAuthorsRepository,
  ListAuthorsParams,
} from "../../repositories/IAuthorsRepository";
import { PaginationProps } from "@pagination/types";

import { AppError } from "@shared/errors/AppError";

@injectable()
class ListAllAuthorsUseCase {
  constructor(
    @inject("AuthorsRepository")
    private authorsRepository: IAuthorsRepository
  ) {}

  async execute({
    page,
    elements,
  }: PaginationProps): Promise<ListAuthorsParams> {
    let offset = (page - 1) * elements;
    if (page == 1) offset = 0;

    const { authors, total } = await this.authorsRepository.list({
      page: offset,
      elements,
    });

    if (!authors) throw new AppError("Not found authors.", 404);

    return {
      authors,
      total,
      currentPage: page,
    };
  }
}

export { ListAllAuthorsUseCase };
