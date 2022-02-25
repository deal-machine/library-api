import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";
import { DeleteExemplaryUseCase } from "./DeleteExemplaryUseCase";

class DeleteExemplaryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteExemplaryUseCase = container.resolve(DeleteExemplaryUseCase);

    await deleteExemplaryUseCase.execute(Number(id));

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      message: "Success on delete.",
    });
  }
}

export { DeleteExemplaryController };
