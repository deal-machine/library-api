import { Request, Response } from "express";

import config from "config";
import { container } from "tsyringe";
import { TurnEmployeeAdminUseCase } from "./TurnEmployeeAdminUseCase";

class TurnEmployeeAdminController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const turnEmployeeAdminUseCase = container.resolve(
      TurnEmployeeAdminUseCase
    );

    await turnEmployeeAdminUseCase.execute(Number(id));

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      message: `Employee id: ${id}`,
    });
  }
}

export { TurnEmployeeAdminController };
