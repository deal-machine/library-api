import { Response, Request } from "express";
import { container } from "tsyringe";

import config from "config";

import { CreateExemplaryUseCase } from "./CreateExemplaryUseCase";

class CreateExemplaryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { sampleCode, purchaseDate, provider, bookId } = request.body;

    const createExemplaryUseCase = container.resolve(CreateExemplaryUseCase);

    const exemplary = await createExemplaryUseCase.execute(Number(bookId), {
      sampleCode,
      provider,
      purchaseDate,
    });

    return response.status(201).json({
      version: config.get("api.version"),
      success: true,
      data: { exemplary },
    });
  }
}

export { CreateExemplaryController };
