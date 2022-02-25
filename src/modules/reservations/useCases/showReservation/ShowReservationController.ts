import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";

import { ShowReservationUseCase } from "./ShowReservationUseCase";

class ShowReservationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showReservationUseCase = container.resolve(ShowReservationUseCase);

    const reservation = await showReservationUseCase.execute(Number(id));

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      data: reservation,
    });
  }
}

export { ShowReservationController };
