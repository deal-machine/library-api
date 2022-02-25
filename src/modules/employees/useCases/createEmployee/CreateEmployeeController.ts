import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";

import { CreateEmployeeUseCase } from "./CreateEmployeeUseCase";

class CreateEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, birthDate, cpf, address, email, password } = request.body;

    const createEmployeeUseCase = container.resolve(CreateEmployeeUseCase);

    const employee = await createEmployeeUseCase.execute({
      name,
      birthDate,
      cpf,
      address,
      email,
      password,
    });

    return response.status(201).json({
      version: config.get("api.version"),
      success: true,
      data: { employee },
    });
  }
}

export { CreateEmployeeController };
