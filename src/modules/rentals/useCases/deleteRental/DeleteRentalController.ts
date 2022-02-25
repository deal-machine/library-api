import { Request, Response } from "express-serve-static-core";
import { container } from "tsyringe";

import config from "config";
import { DeleteRentalUseCase } from "./DeleteRentalUseCase";

class DeleteRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteRentalUseCase = container.resolve(DeleteRentalUseCase);

    await deleteRentalUseCase.execute(Number(id));

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      message: "Success on delete.",
    });
  }
}

export { DeleteRentalController };
