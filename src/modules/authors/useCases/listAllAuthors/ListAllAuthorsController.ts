import { Response, Request } from "express";
import { container } from "tsyringe";
import config from "config";

import { ListAllAuthorsUseCase } from "./ListAllAuthorUseCase";

class ListAllAuthorsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllAuthorsUseCase = container.resolve(ListAllAuthorsUseCase);
    const { page = 1, limit = 7 } = request.query;

    const { authors, total, currentPage } = await listAllAuthorsUseCase.execute(
      {
        page: Number(page),
        elements: Number(limit),
      }
    );

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      total,
      currentPage,
      data: { authors },
    });
  }
}

export { ListAllAuthorsController };
