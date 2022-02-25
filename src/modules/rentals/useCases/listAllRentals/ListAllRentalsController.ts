import { Request, Response } from "express";
import { container } from "tsyringe";

import config from "config";

import { ListAllRentalsUseCase } from "./ListAllRentalsUseCase";

class ListAllRentalsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      employeeId = 0,
      exemplaryId = 0,
      userId = 0,
      sampleCode = "",
    } = request.query;

    const rentalStartDate = !request.query.rentalStartDate
      ? undefined
      : new Date(`${request.query.rentalStartDate}`);

    const rentalEndDate = !request.query.rentalEndDate
      ? undefined
      : new Date(`${request.query.rentalEndDate}`);

    const expectedReturnStartDate = !request.query.expectedReturnStartDate
      ? undefined
      : new Date(`${request.query.expectedReturnStartDate}`);

    const expectedReturnEndDate = !request.query.expectedReturnEndDate
      ? undefined
      : new Date(`${request.query.expectedReturnEndDate}`);

    const returnStartDate = !request.query.returnStartDate
      ? undefined
      : new Date(`${request.query.returnStartDate}`);

    const returnEndDate = !request.query.returnEndDate
      ? undefined
      : new Date(`${request.query.returnEndDate}`);

    const listAllRentalsUseCase = container.resolve(ListAllRentalsUseCase);

    const rentals = await listAllRentalsUseCase.execute({
      employeeId,
      exemplaryId,
      userId,
      sampleCode,
      rentalStartDate,
      rentalEndDate,
      expectedReturnStartDate,
      expectedReturnEndDate,
      returnStartDate,
      returnEndDate,
    });

    return response.status(200).json({
      version: config.get("api.version"),
      success: true,
      data: rentals,
    });
  }
}

export { ListAllRentalsController };
