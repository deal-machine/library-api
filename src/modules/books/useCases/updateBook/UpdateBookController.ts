import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";
import { UpdateBookUseCase } from "./UpdateBookUseCase";

class UpdateBookController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, abstract, release } = request.body;

    const updateBookUseCase = container.resolve(UpdateBookUseCase);

    await updateBookUseCase.execute(Number(id), { title, abstract, release });

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      message: "Success on update.",
    });
  }
}

export { UpdateBookController };
