import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";

import { DeleteReservationUseCase } from "./DeleteReservationUseCase";

class DeleteReservationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteReservationUseCase = container.resolve(
      DeleteReservationUseCase
    );

    await deleteReservationUseCase.execute(Number(id));

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      message: "Success on delete.",
    });
  }
}

export { DeleteReservationController };
