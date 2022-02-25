import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit = 7 } = request.query;

    const listAllUsersUseCase = container.resolve(ListAllUsersUseCase);

    const { users, total, currentPage } = await listAllUsersUseCase.execute({
      page: Number(page),
      elements: Number(limit),
    });

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      total,
      currentPage,
      data: { users },
    });
  }
}

export { ListAllUsersController };
