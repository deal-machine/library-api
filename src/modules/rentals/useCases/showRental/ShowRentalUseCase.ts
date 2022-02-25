import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { Rental } from "@database/models";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { IExemplaryRepository } from "@modules/exemplary/repositories/IExemplaryRepository";

@injectable()
class ShowRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute(id: number): Promise<Rental> {
    const rent = await this.rentalsRepository.getById(id);
    if (!rent) throw new AppError("Rental not found.", 404);

    let rental: Rental = {};

    const status = rent.returnDate == null ? "A Devolver" : "Devolvido";
    Object.assign(rental, { status, rental: rent });

    return rental;
  }
}

export { ShowRentalUseCase };
