import { Request, Response } from "express";

import config from "config";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, cpf, address, birthDate } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      name,
      email,
      cpf,
      address,
      birthDate,
    });

    return response.status(201).json({
      version: config.get("api.version"),
      success: true,
      data: { user },
    });
  }
}

export { CreateUserController };
