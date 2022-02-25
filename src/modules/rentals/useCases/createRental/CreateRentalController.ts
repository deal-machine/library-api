import { Request, Response } from "express";

import config from "config";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { employeeId, exemplaryId, userId } = request.body;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      employeeId,
      exemplaryId,
      userId,
    });

    return response.status(201).json({
      version: config.get("api.version"),
      success: true,
      data: { rental },
    });
  }
}

export { CreateRentalController };
