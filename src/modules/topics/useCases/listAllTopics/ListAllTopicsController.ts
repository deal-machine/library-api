import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";
import { ListAllTopicsUseCase } from "./ListAllTopicsUseCase";

class ListAllTopicsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit = 7 } = request.query;

    const listAllTopicsUseCase = container.resolve(ListAllTopicsUseCase);

    const { topics, total, currentPage } = await listAllTopicsUseCase.execute({
      page: Number(page),
      elements: Number(limit),
    });

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      currentPage,
      total,
      data: { topics },
    });
  }
}

export { ListAllTopicsController };
