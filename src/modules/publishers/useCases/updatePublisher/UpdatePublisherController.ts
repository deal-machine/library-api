import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";

import { UpdatePublisherUseCase } from "./UpdatePublisherUseCase";

class UpdatePublisherController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { description } = request.body;

    const updatePublisherUseCase = container.resolve(UpdatePublisherUseCase);

    await updatePublisherUseCase.execute(Number(id), { description });

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      message: "Success on update.",
    });
  }
}

export { UpdatePublisherController };
