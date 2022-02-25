import { Request, Response } from "express";
import config from "config";
import { container } from "tsyringe";

import { ListAllEmployeesUseCase } from "./ListAllEmployeesUseCase";

class ListAllEmployeesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit = 7 } = request.query;

    const listAllEmployeesUseCase = container.resolve(ListAllEmployeesUseCase);

    const { employees, total, currentPage } =
      await listAllEmployeesUseCase.execute({
        page: Number(page),
        elements: Number(limit),
      });

    employees.map((employee) => (employee.password = undefined));

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      total,
      currentPage,
      data: { employees },
    });
  }
}
export { ListAllEmployeesController };
