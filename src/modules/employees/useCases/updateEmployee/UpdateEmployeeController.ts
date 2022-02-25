import { Request, Response } from "express";
import { container } from "tsyringe";
import config from "config";

import { UpdateEmployeeUseCase } from "./UpdateEmployeeUseCase";

class UpdateEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, birthDate, address, email } = request.body;

    const updateEmployeeUseCase = container.resolve(UpdateEmployeeUseCase);

    const employee = await updateEmployeeUseCase.execute(Number(id), {
      name,
      birthDate,
      address,
      email,
    });

    employee.password = undefined;

    return response
      .status(200)
      .json({
        version: config.get("api.version"),
        success: true,
        data: { employee },
      });
  }
}

export { UpdateEmployeeController };
