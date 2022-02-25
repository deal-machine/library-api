import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";
import { DeleteTopicUseCase } from "./DeleteTopicUseCase";

class DeleteTopicController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteTopicUseCase = container.resolve(DeleteTopicUseCase);

    await deleteTopicUseCase.execute(Number(id));

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      message: "Success on delete.",
    });
  }
}

export { DeleteTopicController };
