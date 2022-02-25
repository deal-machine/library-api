import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, cpf, address, birthDate } = request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    await updateUserUseCase.execute(Number(id), {
      name,
      email,
      cpf,
      address,
      birthDate,
    });

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      message: "Success on update.",
    });
  }
}

export { UpdateUserController };
