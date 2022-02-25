import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import moment from "moment";

import {
  IReservationsRepository,
  ReservationAttributes,
} from "@modules/reservations/repositories/IReservationsRepository";

import { AppError } from "@shared/errors/AppError";
import { IExemplaryRepository } from "@modules/exemplary/repositories/IExemplaryRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IEmployeesRepository } from "@modules/employees/repositories/IEmployeesRepository";

@injectable()
class UpdateReservationUseCase {
  constructor(
    @inject("ReservationsRepository")
    private reservationsRepository: IReservationsRepository,
    @inject("ExemplaryRepository")
    private exemplaryRepository: IExemplaryRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("EmployeesRepository")
    private employeeRepository: IEmployeesRepository
  ) {}

  async execute(
    id: number,
    {
      employeeId,
      exemplaryId,
      userId,
      startDate,
      endDate,
    }: ReservationAttributes
  ) {
    if (moment(endDate).isBefore(startDate))
      throw new AppError("Start Date must be before the end date.", 406);

    const reservation = await this.reservationsRepository.findById(id);
    if (!reservation) throw new AppError("Reservation not found.", 404);
    if (
      reservation.rentalId != null ||
      (moment(reservation.endDate).isBefore(new Date()) &&
        reservation.rentalId == null)
    )
      throw new AppError("Reservation is not open to update.", 406);

    const employee = await this.employeeRepository.findById(employeeId);
    if (!employee) throw new AppError("Employee not found.", 404);

    const exemplary = await this.exemplaryRepository.findById(exemplaryId);
    if (!exemplary) throw new AppError("Exemplary not found.", 404);

    const book = await exemplary.getBook();
    if (!book) throw new AppError("Book not found.", 404);

    const user = await this.usersRepository.findById(userId);
    if (!user) throw new AppError("User not found.", 404);

    const exemplaryReservationAlreadyExists =
      await this.reservationsRepository.findByDatesAndExemplary({
        exemplaryId: exemplary.id,
        startDate,
        endDate,
      });

    if (exemplaryReservationAlreadyExists.length > 0)
      throw new AppError(
        "Exemplary already reserved on this date interval.",
        406
      );

    //Não permitir reservar o mesmo livro, com exemplares diferentes para o mesmo usuário no mesmo período;
    const verifyReservationByBookAndUser =
      await this.reservationsRepository.findByBookAndUser({
        bookId: book.id,
        userId,
        startDate,
        endDate,
      });

    if (verifyReservationByBookAndUser.length > 0)
      throw new AppError("Reservation already exists to user and book.", 409);

    const updatedReservation = await this.reservationsRepository.update(
      reservation,
      {
        employeeId,
        exemplaryId,
        userId,
        startDate,
        endDate,
      }
    );

    if (!updatedReservation)
      throw new AppError("Cannot update the reservation.");

    return reservation;
  }
}

export { UpdateReservationUseCase };
