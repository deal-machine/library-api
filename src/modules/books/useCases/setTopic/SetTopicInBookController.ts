import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";
import { SetTopicInBookUseCase } from "./SetTopicInBookUseCase";

class SetTopicInBookController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { topicIds } = request.body;

    const setTopicInBookUseCase = container.resolve(SetTopicInBookUseCase);

    const book = await setTopicInBookUseCase.execute(Number(id), topicIds);

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      data: { book },
    });
  }
}

export { SetTopicInBookController };
