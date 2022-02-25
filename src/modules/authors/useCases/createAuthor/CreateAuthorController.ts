import { Request, Response } from "express";
import { container } from "tsyringe";
import config from "config";

import { CreateAuthorUseCase } from "./CreateAuthorUseCase";

class CreateAuthorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, namePublication } = request.body;

    const createAuthorUseCase = container.resolve(CreateAuthorUseCase);

    const author = await createAuthorUseCase.execute({
      name,
      namePublication,
    });

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      data: { author },
    });
  }
}

export { CreateAuthorController };
