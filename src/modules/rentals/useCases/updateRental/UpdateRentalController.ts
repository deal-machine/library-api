import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";

import { UpdateRentalUseCase } from "./UpdateRentalUseCase";

class UpdateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { employeeId, exemplaryId, userId } = request.body;

    const updateRentalUseCase = container.resolve(UpdateRentalUseCase);

    const rental = await updateRentalUseCase.execute(Number(id), {
      employeeId,
      exemplaryId,
      userId,
    });

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      data: { rental },
    });
  }
}

export { UpdateRentalController };
