import { Request, Response } from "express";
import { container } from "tsyringe";
import config from "config";

import { UpdateAuthorUseCase } from "./UpdateAuthorUseCase";

import { Author } from "@shared/infra/sequelize/models";

class UpdateAuthorController {
  async handle(request: Request, response: Response): Promise<Author> {
    const { name, namePublication } = request.body;
    const { id } = request.params;

    const updateAuthorUseCase = container.resolve(UpdateAuthorUseCase);

    const author = await updateAuthorUseCase.execute(Number(id), {
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

export { UpdateAuthorController };
