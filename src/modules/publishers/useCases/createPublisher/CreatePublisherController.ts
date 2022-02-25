import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";
import { CreatePublisherUseCase } from "./CreatePublisherUseCase";

class CreatePublisherController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { description } = request.body;

    const createPublisherUseCase = container.resolve(CreatePublisherUseCase);

    const publisher = await createPublisherUseCase.execute({ description });

    return response.status(201).json({
      version: config.get("api.version"),
      success: true,
      data: { publisher },
    });
  }
}

export { CreatePublisherController };
