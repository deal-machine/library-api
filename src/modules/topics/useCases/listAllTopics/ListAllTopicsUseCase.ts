import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { PaginationProps } from "@pagination/types";

import {
  ITopicsRepository,
  ListTopicsParams,
} from "@modules/topics/repositories/ITopicsRepository";

import { AppError } from "@shared/errors/AppError";

@injectable()
class ListAllTopicsUseCase {
  constructor(
    @inject("TopicsRepository")
    private topicsRepository: ITopicsRepository
  ) {}

  async execute({
    page,
    elements,
  }: PaginationProps): Promise<ListTopicsParams> {
    let offset = (page - 1) * elements;
    if (page == 1) offset = 0;

    const { topics, total } = await this.topicsRepository.list({
      page: offset,
      elements,
    });

    if (!topics) throw new AppError("Topics not found.", 404);

    return { topics, total, currentPage: page };
  }
}
export { ListAllTopicsUseCase };
