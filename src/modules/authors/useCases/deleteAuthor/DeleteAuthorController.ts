import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";

import { DeleteAuthorUseCase } from "./DeleteAuthorUseCase";

class DeleteAuthorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAuthorUseCase = container.resolve(DeleteAuthorUseCase);

    await deleteAuthorUseCase.execute(Number(id));

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      message: "Sucess on delete.",
    });
  }
}

export { DeleteAuthorController };
