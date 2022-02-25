import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";

import { ListAllBooksUseCase } from "./ListAllBooksUseCase";

class ListAllBooksController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit = 7 } = request.query;

    const listAllBooksUseCase = container.resolve(ListAllBooksUseCase);

    const { books, currentPage, total } = await listAllBooksUseCase.execute({
      page: Number(page),
      elements: Number(limit),
    });

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      total,
      currentPage,
      data: { books },
    });
  }
}

export { ListAllBooksController };
