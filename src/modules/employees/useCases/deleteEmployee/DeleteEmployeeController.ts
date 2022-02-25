import { Request, Response } from "express";
import { container } from "tsyringe";
import config from "config";

import { DeleteEmployeeUseCase } from "./DeleteEmployeeUseCase";

class DeleteEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteEmployeeUseCase = container.resolve(DeleteEmployeeUseCase);

    await deleteEmployeeUseCase.execute(Number(id));

    return response
      .status(200)
      .json({
        version: config.get("api.version"),
        success: true,
        message: "Success on delete.",
      });
  }
}

export { DeleteEmployeeController };
