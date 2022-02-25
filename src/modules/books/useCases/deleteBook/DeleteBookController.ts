import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";
import { DeleteBookUseCase } from "./DeleteBookUseCase";

class DeleteBookController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteBookUseCase = container.resolve(DeleteBookUseCase);

    await deleteBookUseCase.execute(Number(id));

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      message: "Sucess on delete.",
    });
  }
}

export { DeleteBookController };
