import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";

import { Exemplary } from "@database/models";
import { ShowExemplaryUseCase } from "./ShowExemplaryUseCase";

class ShowExemplaryController {
  async handle(request: Request, response: Response): Promise<Exemplary> {
    const { id } = request.params;

    const showExemplaryUseCase = container.resolve(ShowExemplaryUseCase);

    const exemplary = await showExemplaryUseCase.execute(Number(id));

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      data: { exemplary },
    });
  }
}

export { ShowExemplaryController };
