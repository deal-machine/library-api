import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";
import { ListAllPublishersUseCase } from "./ListAllPublishersUseCase";

class ListAllPublishersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit = 7 } = request.query;

    const listAllPublishersUseCase = container.resolve(
      ListAllPublishersUseCase
    );

    const { publishers, currentPage, total } =
      await listAllPublishersUseCase.execute({
        page: Number(page),
        elements: Number(limit),
      });

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      currentPage,
      total,
      data: { publishers },
    });
  }
}

export { ListAllPublishersController };
