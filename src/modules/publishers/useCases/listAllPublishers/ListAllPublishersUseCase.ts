import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { Publisher } from "@database/models";
import {
  IPublishersRepository,
  ListPublishersParams,
} from "@modules/publishers/repositories/IPublishersRepository";
import { PaginationProps } from "@pagination/types";

import { AppError } from "@shared/errors/AppError";

@injectable()
class ListAllPublishersUseCase {
  constructor(
    @inject("PublishersRepository")
    private publishersRepository: IPublishersRepository
  ) {}

  async execute({
    page,
    elements,
  }: PaginationProps): Promise<ListPublishersParams> {
    let offset = (page - 1) * elements;
    if (page == 1) offset = 0;

    const { publishers, total } = await this.publishersRepository.list({
      page: offset,
      elements,
    });

    if (!publishers) throw new AppError("Publishers not found.", 404);

    return {
      publishers,
      currentPage: page,
      total: total,
    };
  }
}

export { ListAllPublishersUseCase };
