import "reflect-metadata";

import { inject, injectable } from "tsyringe";

import { IExemplaryRepository } from "@modules/exemplary/repositories/IExemplaryRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IReservationsRepository } from "@modules/reservations/repositories/IReservationsRepository";

import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteExemplaryUseCase {
  constructor(
    @inject("ExemplaryRepository")
    private exemplaryRepository: IExemplaryRepository,
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("ReservationsRepository")
    private reservationsRepository: IReservationsRepository
  ) {}

  async execute(id: number): Promise<void> {
    const exemplary = await this.exemplaryRepository.findById(id);

    if (!exemplary) throw new AppError("Exemplary not found.", 404);

    const allReservationsByExemplary =
      await this.reservationsRepository.findAndCountReservationsByExemplary(id);

    if (allReservationsByExemplary["count"] > 0)
      throw new AppError(
        "Cannot delete exemplary with reservation associated.",
        406
      );

    const allRentalsByExemplary =
      await this.rentalsRepository.findAndCountRentalsByExemplary(id);

    if (allRentalsByExemplary["count"] > 0)
      throw new AppError(
        "Cannot delete exemplary with rental associated.",
        406
      );

    await this.exemplaryRepository.delete(id);
  }
}

export { DeleteExemplaryUseCase };
