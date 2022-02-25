import "reflect-metadata";

import { inject, injectable } from "tsyringe";

import { Exemplary } from "@database/models";
import { IExemplaryRepository } from "@modules/exemplary/repositories/IExemplaryRepository";

import { AppError } from "@shared/errors/AppError";

@injectable()
class ShowExemplaryUseCase {
  constructor(
    @inject("ExemplaryRepository")
    private exemplaryRepository: IExemplaryRepository
  ) {}
  async execute(id: number): Promise<Exemplary> {
    const exemplary = await this.exemplaryRepository.getById(id);

    if (!exemplary) throw new AppError("Exemplary not found.", 404);

    return exemplary;
  }
}

export { ShowExemplaryUseCase };
