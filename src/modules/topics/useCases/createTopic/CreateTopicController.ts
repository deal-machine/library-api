import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";

import { CreateTopicUseCase } from "./CreateTopicUseCase";

class CreateTopicController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { description } = request.body;

    const createTopicUseCase = container.resolve(CreateTopicUseCase);

    const topic = await createTopicUseCase.execute({ description });

    return response.status(201).json({
      version: config.get("api.version"),
      success: true,
      data: { topic },
    });
  }
}
export { CreateTopicController };
