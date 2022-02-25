import { Request, Response } from "express";
import { container } from "tsyringe";
import config from "config";

import { ShowAuthorUseCase } from "./ShowAuthorUseCase";

class ShowAuthorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showAuthorUseCase = container.resolve(ShowAuthorUseCase);

    const author = await showAuthorUseCase.execute(Number(id));

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      data: { author },
    });
  }
}

export { ShowAuthorController };
