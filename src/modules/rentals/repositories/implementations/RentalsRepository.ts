import database, {
  Rental,
  Exemplary,
  User,
  Employee,
  Book,
  Reservation,
} from "@database/models";

import sequelize, { Op, Transaction } from "sequelize";

import {
  IRentalsRepository,
  RentalsAttributes,
  RentalsListParameters,
} from "../IRentalsRepository";

class RentalsRepository implements IRentalsRepository {
  async list({
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
  }: RentalsListParameters): Promise<Rental[]> {
    const rentals = await Rental.findAll({
      where: {
        [Op.and]: [
          {
            employeeId:
              employeeId == 0 ? { [Op.not]: null } : { [Op.eq]: employeeId },
          },
          {
            exemplaryId:
              exemplaryId == 0 ? { [Op.not]: null } : { [Op.eq]: exemplaryId },
          },
          { userId: userId == 0 ? { [Op.not]: null } : { [Op.eq]: userId } },
          {
            rentalDate:
              rentalStartDate != undefined
                ? rentalEndDate != undefined
                  ? { [Op.between]: [rentalStartDate, rentalEndDate] }
                  : { [Op.gte]: rentalStartDate }
                : rentalEndDate !== undefined
                ? { [Op.lte]: rentalEndDate }
                : { [Op.not]: null },
          },
          {
            expectedReturnDate:
              expectedReturnStartDate != undefined
                ? expectedReturnEndDate != undefined
                  ? {
                      [Op.between]: [
                        expectedReturnStartDate,
                        expectedReturnEndDate,
                      ],
                    }
                  : { [Op.gte]: expectedReturnStartDate }
                : expectedReturnEndDate !== undefined
                ? { [Op.lte]: expectedReturnEndDate }
                : { [Op.not]: null },
          },
          {
            returnDate:
              returnStartDate != undefined
                ? returnEndDate != undefined
                  ? {
                      [Op.between]: [returnStartDate, returnEndDate],
                    }
                  : { [Op.gte]: returnStartDate }
                : returnEndDate !== undefined
                ? { [Op.lte]: returnEndDate }
                : { [Op.or]: [{ [Op.is]: null }, { [Op.not]: null }] },
          },
        ],
      },
      attributes: ["rentalDate", "expectedReturnDate", "returnDate", "penalty"],

      include: [
        {
          model: Exemplary,
          attributes: ["sampleCode", "provider", "purchaseDate"],
          include: { model: Book, as: "book", attributes: ["title"] },
          where: {
            [Op.and]: [
              {
                bookId: bookId == 0 ? { [Op.not]: null } : { [Op.eq]: bookId },
              },
              {
                sampleCode: { [Op.iLike]: `%${sampleCode}%` },
              },
            ],
          },
        },
        { model: User, attributes: ["name", "email"] },
        { model: Employee, attributes: ["name", "email"] },
      ],
    });

    return rentals;
  }

  async findAndCountRentalsByExemplary(id: number): Promise<Number> {
    const totalByExemplary = await Rental.findAndCountAll({
      where: {
        exemplaryId: id,
      },
    });

    return totalByExemplary;
  }

  async findRentalsByExemplaryAndDate(exemplaryId: number): Promise<Rental[]> {
    const actualDate = new Date();
    const rentals = await Rental.findAll({
      where: {
        [Op.and]: [
          {
            exemplaryId,
          },
          {
            rentalDate: { [Op.lte]: actualDate },
          },
          {
            expectedReturnDate: { [Op.gte]: actualDate },
          },
          {
            returnDate: { [Op.is]: null },
          },
        ],
      },
    });

    return rentals;
  }

  async getById(id: number): Promise<Rental> {
    const rental = await Rental.findOne({
      where: { id },
      attributes: ["rentalDate", "expectedReturnDate", "returnDate", "penalty"],
      include: [
        {
          model: Exemplary,
          attributes: ["sampleCode", "provider", "purchaseDate"],
          include: { model: Book, as: "book", attributes: ["title"] },
        },
        { model: User, attributes: ["name", "email"] },
        { model: Employee, attributes: ["name", "email"] },
      ],
    });

    return rental;
  }

  async findById(id: number): Promise<Rental> {
    const rental = await Rental.findOne({ where: { id } });

    return rental;
  }

  async create({
    employeeId,
    exemplaryId,
    userId,
    rentalDate,
    expectedReturnDate,
    returnDate,
  }: RentalsAttributes): Promise<Rental> {
    const rental = await Rental.create({
      employeeId,
      exemplaryId,
      userId,
      rentalDate,
      expectedReturnDate,
      returnDate,
    });
    return rental;
  }

  async createRentalAndUpdateReservation(
    reservation: Reservation,
    {
      employeeId,
      exemplaryId,
      userId,
      rentalDate,
      expectedReturnDate,
      returnDate,
    }: RentalsAttributes
  ): Promise<Rental> {
    let rental: Rental;

    await database.sequelize.transaction(async (trans: any) => {
      rental = await Rental.create(
        {
          employeeId,
          exemplaryId,
          userId,
          rentalDate,
          expectedReturnDate,
          returnDate,
        },
        { transaction: trans }
      );

      await reservation.setRental(rental, { transaction: trans });
    });

    return rental;
  }

  async update(
    rental: Rental,
    { employeeId, exemplaryId, userId }: RentalsAttributes
  ): Promise<boolean> {
    return await rental.update({ employeeId, exemplaryId, userId });
  }

  async delete(id: number): Promise<void> {
    await Rental.destroy({ where: { id } });
  }

  /**
   * about reservations
   * 
   */
   async findReservationsByExemplaryAndUser(
    exemplaryId: number,
    userId: number
  ): Promise<Reservation[]> {
    const actualDate = new Date();

    const reservations = await Reservation.findAll({
      where: {
        [Op.and]: [
          {
            exemplaryId,
          },
          { userId: { [Op.not]: userId } },
          {
            startDate: { [Op.lte]: actualDate },
          },
          {
            endDate: { [Op.gte]: actualDate },
          },
          {
            rentalId: { [Op.is]: null },
          },
        ],
      },
    });

    return reservations;
  }

  async getReservationByExemplaryAndUser(
    exemplaryId: number,
    userId: number
  ): Promise<Reservation> {
    const actualDate = new Date();

    const reservation = await Reservation.findOne({
      where: {
        [Op.and]: [
          {
            exemplaryId,
          },
          { userId: { [Op.eq]: userId } },
          {
            startDate: { [Op.lte]: actualDate },
          },
          {
            endDate: { [Op.gte]: actualDate },
          },
          {
            rentalId: { [Op.is]: null },
          },
        ],
      },
    });

    return reservation;
  }
}

export { RentalsRepository };
