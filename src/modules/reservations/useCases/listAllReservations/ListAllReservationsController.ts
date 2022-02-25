import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";
import { ListAllReservatiosUseCase } from "./ListAllReservationsUseCase";
import { ReservationAttributes } from "@modules/reservations/repositories/IReservationsRepository";

class ListAllReservationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      employeeId = 0,
      exemplaryId = 0,
      userId = 0,
      rentalId = 0,
    } = request.query;

    const reservationStartDate = !request.query.reservationStartDate
      ? undefined
      : new Date(`${request.query.reservationStartDate}`);

    const reservationEndDate = !request.query.reservationEndDate
      ? undefined
      : new Date(`$${request.query.reservationEndDate}`);

    const createdStartDate = !request.query.createdStartDate
      ? undefined
      : new Date(`${request.query.createdStartDate}`);

    const createdEndDate = !request.query.createdEndDate
      ? undefined
      : new Date(`${request.query.createdEndDate}`);

    const listAllReservationsUseCase = container.resolve(
      ListAllReservatiosUseCase
    );

    const reservations = await listAllReservationsUseCase.execute(
      Number(employeeId),
      Number(exemplaryId),
      Number(userId),
      Number(rentalId),
      reservationStartDate,
      reservationEndDate,
      createdStartDate,
      createdEndDate
    );

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      data: reservations,
    });
  }
}
export { ListAllReservationsController };
