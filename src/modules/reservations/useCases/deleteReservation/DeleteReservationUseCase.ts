import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { Reservation } from "@database/models";

import { AppError } from "@shared/errors/AppError";
import { IReservationsRepository } from "@modules/reservations/repositories/IReservationsRepository";

@injectable()
class DeleteReservationUseCase {
  constructor(
    @inject("ReservationsRepository")
    private reservationsRepository: IReservationsRepository
  ) {}

  async execute(id: number): Promise<void> {
    const reservation = await this.reservationsRepository.findById(id);

    if (!reservation) throw new AppError("Reservation not found.", 404);

    if (reservation.rentalId != null)
      throw new AppError("Cannot delete reservation with rental.", 406);

    await this.reservationsRepository.delete(reservation.id);
  }
}

export { DeleteReservationUseCase };
