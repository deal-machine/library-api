import { inject, injectable } from "tsyringe";

import { Reservation } from "@database/models";
import { IReservationsRepository } from "@modules/reservations/repositories/IReservationsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ShowReservationUseCase {
  constructor(
    @inject("ReservationsRepository")
    private reservationsRepository: IReservationsRepository
  ) {}

  async execute(id: number): Promise<Reservation> {
    const reservation = await this.reservationsRepository.findById(id);

    if (!reservation) throw new AppError("Reservation not found.", 404);

    const status =
      reservation.rentalId != null
        ? "atendida"
        : reservation.endDate < new Date()
        ? "vencida"
        : "aberta";

    const reservationWithStatus = {};
    Object.assign(reservationWithStatus, { status, reservation });

    return reservationWithStatus as "reservation";
  }
}

export { ShowReservationUseCase };
