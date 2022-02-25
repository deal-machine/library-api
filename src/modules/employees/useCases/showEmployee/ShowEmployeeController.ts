import { Request, Response } from "express";
import { container } from "tsyringe";
import config from "config";
import { ShowEmployeeUseCase } from "./ShowEmployeeUseCase";

class ShowEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showEmployeeUseCase = container.resolve(ShowEmployeeUseCase);

    const employee = await showEmployeeUseCase.execute(Number(id));

    return response
      .status(200)
      .json({
        version: config.get("api.version"),
        success: true,
        data: { employee },
      });
  }
}

export { ShowEmployeeController };
