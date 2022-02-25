import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";

import { CreateBookUseCase } from "./CreateBookUseCase";

class CreateBookController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, abstract, release, publisherId } = request.body;

    const createBookUseCase = container.resolve(CreateBookUseCase);

    const book = await createBookUseCase.execute({
      title,
      abstract,
      release,
      publisherId: Number(publisherId),
    });

    return response.status(201).json({
      version: config.get("api.version"),
      success: true,
      data: { book },
    });
  }
}

export { CreateBookController };
