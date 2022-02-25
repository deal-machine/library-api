import "reflect-metadata";
import { injectable, inject } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { Rental } from "@database/models";
import {
  IRentalsRepository,
  RentalsAttributes,
} from "@modules/rentals/repositories/IRentalsRepository";
import { IExemplaryRepository } from "@modules/exemplary/repositories/IExemplaryRepository";
import { booksRouter } from "@shared/infra/http/routes/books.routes";

@injectable()
class ListAllRentalsUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("ExemplaryRepository")
    private exemplaryRepository: IExemplaryRepository
  ) {}

  async execute({
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
  }): Promise<Rental[]> {
    let bookId = 0;
    if (exemplaryId != 0) {
      const exemplary = await this.exemplaryRepository.findById(exemplaryId);
      if (!exemplary) throw new AppError("Exemplary not found.", 404);

      const book = await exemplary.getBook();
      if (!book) throw new AppError("Boot not found.", 404);

      bookId = book.id;
    }

    const allRentals = await this.rentalsRepository.list({
      employeeId,
      exemplaryId,
      userId,
      bookId,
      sampleCode,
      rentalStartDate,
      rentalEndDate,
      expectedReturnStartDate,
      expectedReturnEndDate,
      returnStartDate,
      returnEndDate,
    });

    if (!allRentals) throw new AppError("Rentals not found.", 404);

    let rentals: Rental[] = [];

    allRentals.map((rent) => {
      let rents = {};

      const status = rent.returnDate == null ? "A devolver" : "Devolvido";

      Object.assign(rents, { status, rental: rent });

      rentals.push(rents);
    });

    return rentals;
  }
}

export { ListAllRentalsUseCase };
