import { Request, Response } from "express";

import config from "config";
import { container } from "tsyringe";
import { DeletePublisherUseCase } from "./DeletePublisherUseCase";

class DeletePublisherController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePublisherUseCase = container.resolve(DeletePublisherUseCase);

    await deletePublisherUseCase.execute(Number(id));

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      message: "Success on delete.",
    });
  }
}

export { DeletePublisherController };
