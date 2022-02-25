import { Request, Response } from "express";
import { container } from "tsyringe";

import moment from "moment";
import config from "config";

import { CreateReservationUseCase } from "./CreateReservationUseCase";

class CreateReservationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      employeeId = 0,
      exemplaryId = 0,
      userId = 0,
      rentalId = 0,
    } = request.body;

    const startDate = new Date(`${request.body.startDate}`);
    const endDate = new Date(`${request.body.endDate}`);

    const createReservationUseCase = container.resolve(
      CreateReservationUseCase
    );

    const reservation = await createReservationUseCase.execute({
      employeeId,
      exemplaryId,
      userId,
      rentalId,
      startDate,
      endDate,
    });

    return response.status(201).json({
      version: config.get("api.version"),
      success: true,
      data: { reservation },
    });
  }
}

export { CreateReservationController };
