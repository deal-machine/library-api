import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";
import { ShowTopicUseCase } from "./ShowTopicUseCase";

class ShowTopicController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showTopicUseCase = container.resolve(ShowTopicUseCase);

    const topic = await showTopicUseCase.execute(Number(id));

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      data: { topic },
    });
  }
}

export { ShowTopicController };
