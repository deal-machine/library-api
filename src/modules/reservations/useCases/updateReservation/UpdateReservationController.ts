import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";
import { UpdateReservationUseCase } from "./UpdateReservationUseCase";

class UpdateReservationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { userId, exemplaryId, employeeId } = request.body;

    const startDate = new Date(`${request.body.startDate}`);
    const endDate = new Date(`${request.body.endDate}`);

    const updateReservationUseCase = container.resolve(
      UpdateReservationUseCase
    );

    const reservation = await updateReservationUseCase.execute(Number(id), {
      employeeId,
      exemplaryId,
      userId,
      startDate,
      endDate,
    });

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      data: reservation,
    });
  }
}

export { UpdateReservationController };
