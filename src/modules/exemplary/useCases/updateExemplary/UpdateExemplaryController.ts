import { Response, Request } from "express";
import { container } from "tsyringe";

import config from "config";
import { UpdateExemplaryUseCase } from "./UpdateExemplaryUseCase";

class UpdateExemplaryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { bookId, sampleCode, provider, purchaseDate } = request.body;

    const updateExemplaryUseCase = container.resolve(UpdateExemplaryUseCase);

    await updateExemplaryUseCase.execute(Number(id), {
      bookId,
      sampleCode,
      provider,
      purchaseDate,
    });

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      message: "Success on update.",
    });
  }
}

export { UpdateExemplaryController };
