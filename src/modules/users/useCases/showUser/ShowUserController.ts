import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";
import { ShowUserUseCase } from "./ShowUserUseCase";

class ShowUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUserUseCase = container.resolve(ShowUserUseCase);

    const user = await showUserUseCase.execute(Number(id));

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      data: { user },
    });
  }
}
export { ShowUserController };
