import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";

import { ListAllExemplaryUseCase } from "./ListAllExemplaryUseCase";

class ListAllExemplaryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { bookId = 0, sampleCode = "", provider = "" } = request.query;

    const purchaseStartDate = !request.query.purchaseStartDate
      ? undefined
      : new Date(`${request.query.purchaseStartDate}`);

    const purchaseEndDate = !request.query.purchaseEndDate
      ? undefined
      : new Date(`${request.query.purchaseEndDate}`);

    const createdStartDate = !request.query.createdStartDate
      ? undefined
      : new Date(`${request.query.createdStartDate}`);

    const createdEndDate = !request.query.createdEndDate
      ? undefined
      : new Date(`${request.query.createdEndDate}`);

    const listAllExemplaryUseCase = container.resolve(ListAllExemplaryUseCase);

    const exemplary = await listAllExemplaryUseCase.execute(
      Number(bookId),
      String(sampleCode),
      String(provider),
      purchaseStartDate,
      purchaseEndDate,
      createdStartDate,
      createdEndDate
    );

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      data: { exemplary },
    });
  }
}

export { ListAllExemplaryController };
