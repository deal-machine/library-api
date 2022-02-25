import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import {
  IReservationsRepository,
  ReservationAttributes,
} from "@modules/reservations/repositories/IReservationsRepository";
import { Reservation } from "@database/models";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListAllReservatiosUseCase {
  constructor(
    @inject("ReservationsRepository")
    private reservationsRepository: IReservationsRepository
  ) {}

  async execute(
    employeeId: number,
    exemplaryId: number,
    userId: number,
    rentalId: number,
    startDate: Date | undefined,
    endDate: Date | undefined,
    createdStartDate: Date | undefined,
    createdEndDate: Date | undefined
  ): Promise<Reservation[]> {
    const allReservations = await this.reservationsRepository.list(
      employeeId,
      exemplaryId,
      userId,
      rentalId,
      startDate,
      endDate,
      createdStartDate,
      createdEndDate
    );

    if (!allReservations) throw new AppError("Reservations not found.", 404);

    const reservations = [];
    allReservations.map((reservation) => {
      const res = {};

      const status =
        reservation.rentalId != null
          ? "atendida"
          : reservation.endDate < new Date()
          ? "vencida"
          : "aberta";

      Object.assign(res, { status, reservation });

      reservations.push(res);
    });

    return reservations;
  }
}

export { ListAllReservatiosUseCase };
