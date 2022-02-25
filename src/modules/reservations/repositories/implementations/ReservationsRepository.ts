import { Op } from "sequelize";
import { Reservation, Exemplary, Employee, User, Book } from "@database/models";

import {
  IReservationsRepository,
  ReservationAttributes,
} from "../IReservationsRepository";

class ReservationsRepository implements IReservationsRepository {
  async list(
    employee: number,
    exemplary: number,
    user: number,
    rental: number,
    reservationStartDate: Date | undefined,
    reservationEndDate: Date | undefined,
    createdStartDate: Date | undefined,
    createdEndDate: Date | undefined
  ): Promise<Reservation> {
    const allReservations = await Reservation.findAll({
      where: {
        [Op.and]: [
          {
            employeeId:
              employee == 0 ? { [Op.not]: null } : { [Op.eq]: employee },
          },
          {
            exemplaryId:
              exemplary == 0 ? { [Op.not]: null } : { [Op.eq]: exemplary },
          },
          { userId: user == 0 ? { [Op.not]: null } : { [Op.eq]: user } },
          // { rentalId: rental == 0 ? { [Op.not]: null } : { [Op.eq]: rental } },
          {
            startDate:
              reservationStartDate == undefined
                ? { [Op.not]: null }
                : { [Op.gte]: reservationStartDate },
            endDate:
              reservationEndDate == undefined
                ? { [Op.not]: null }
                : { [Op.lte]: reservationEndDate },
          },
          {
            createdAt:
              createdStartDate !== undefined
                ? createdEndDate !== undefined
                  ? { [Op.between]: [createdStartDate, createdEndDate] }
                  : { [Op.gte]: createdStartDate }
                : createdEndDate !== undefined
                ? { [Op.lte]: createdEndDate }
                : { [Op.ne]: null },
          },
        ],
      },
      include: [{ model: User, attributes: ["name"] }],
    });

    return allReservations;
  }

  async findById(id: number): Promise<Reservation> {
    const reservation = Reservation.findOne({
      where: { id },
      include: [
        { model: Employee, attributes: ["name"] },
        { model: Exemplary },
        { model: User, attributes: ["name"] },
      ],
    });

    return reservation;
  }

  async findAndCountReservationsByExemplary(id: number): Promise<Number> {
    const allByExemplary = await Reservation.findAndCountAll({
      where: { exemplaryId: id },
    });

    return allByExemplary;
  }

  async findByDatesAndExemplary({
    exemplaryId,
    startDate,
    endDate,
  }): Promise<Reservation> {
    const reservationStartDate = startDate;
    const reservationEndDate = endDate;

    const reservation = await Reservation.findAll({
      where: {
        [Op.and]: [
          { exemplaryId },
          {
            [Op.or]: [
              {
                startDate: {
                  [Op.between]: [reservationStartDate, reservationEndDate],
                },
              },
              {
                endDate: {
                  [Op.between]: [reservationStartDate, reservationEndDate],
                },
              },
            ],
          },
        ],
      },
    });

    return reservation;
  }

  async findByBookAndUser({
    bookId,
    userId,
    startDate,
    endDate,
  }): Promise<Reservation[]> {
    const reservationStartDate = startDate;
    const reservationEndDate = endDate;

    const reservation = await Reservation.findAll({
      where: {
        [Op.and]: [
          { userId },
          {
            [Op.or]: [
              {
                startDate: {
                  [Op.between]: [reservationStartDate, reservationEndDate],
                },
              },
              {
                endDate: {
                  [Op.between]: [reservationStartDate, reservationEndDate],
                },
              },
            ],
          },
        ],
      },
      include: {
        model: Exemplary,
        where: {
          bookId,
        },
        group: "bookId",
      },
    });
    return reservation;
  } 

  async create({
    employeeId,
    exemplaryId,
    userId,
    rentalId,
    startDate,
    endDate,
  }: ReservationAttributes): Promise<Reservation> {
    const newReservation = await Reservation.create({
      employeeId,
      exemplaryId,
      userId,
      rentalId,
      startDate,
      endDate,
    });

    return newReservation;
  }

  async delete(id: number): Promise<void> {
    await Reservation.destroy({ where: { id } });
  }

  async update(
    reservation: Reservation,
    {
      employeeId,
      exemplaryId,
      userId,
      startDate,
      endDate,
    }: ReservationAttributes
  ): Promise<boolean> {
    return await reservation.update({
      employeeId,
      exemplaryId,
      userId,
      startDate,
      endDate,
    });
  }
}

export { ReservationsRepository };
