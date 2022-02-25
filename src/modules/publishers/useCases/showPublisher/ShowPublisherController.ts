import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";
import { ShowPublisherUseCase } from "./ShowPublisherUseCase";

class ShowPublisherController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showPublisherUseCase = container.resolve(ShowPublisherUseCase);

    const publisher = await showPublisherUseCase.execute(Number(id));

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      data: { publisher },
    });
  }
}

export { ShowPublisherController };
