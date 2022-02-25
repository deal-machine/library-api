import "reflect-metadata";

import { injectable, inject } from "tsyringe";

import { Exemplary } from "@database/models";
import { IExemplaryRepository } from "@modules/exemplary/repositories/IExemplaryRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListAllExemplaryUseCase {
  constructor(
    @inject("ExemplaryRepository")
    private exemplaryRepository: IExemplaryRepository
  ) {}
  async execute(
    bookId?: number,
    sampleCode?: string,
    provider?: string,
    purchaseStartDate?: Date | undefined,
    purchaseEndDate?: Date | undefined,
    createdStartDate?: Date | undefined,
    createdEndDate?: Date | undefined
  ): Promise<Exemplary[]> {
    const allExemplary = await this.exemplaryRepository.list(
      bookId,
      sampleCode,
      provider,
      purchaseStartDate,
      purchaseEndDate,
      createdStartDate,
      createdEndDate
    );

    if (!allExemplary) throw new AppError("List of exemplary not found.", 404);

    return allExemplary;
  }
}

export { ListAllExemplaryUseCase };
