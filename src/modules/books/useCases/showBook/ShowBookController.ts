import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";

import { ShowBookUseCase } from "./ShowBookUseCase";

class ShowBookController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showBookUseCase = container.resolve(ShowBookUseCase);

    const book = await showBookUseCase.execute(Number(id));

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      data: { book },
    });
  }
}

export { ShowBookController };
