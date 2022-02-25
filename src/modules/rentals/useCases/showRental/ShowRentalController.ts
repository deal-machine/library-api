import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";

import { ShowRentalUseCase } from "./ShowRentalUseCase";

class ShowRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showRentalUseCase = container.resolve(ShowRentalUseCase);

    const rental = await showRentalUseCase.execute(Number(id));

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      data: rental,
    });
  }
}
export { ShowRentalController };
