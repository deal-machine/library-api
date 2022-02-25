import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import moment from "moment";

import { IEmployeesRepository } from "@modules/employees/repositories/IEmployeesRepository";
import { IExemplaryRepository } from "@modules/exemplary/repositories/IExemplaryRepository";
import {
  IReservationsRepository,
  ReservationAttributes,
} from "@modules/reservations/repositories/IReservationsRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateReservationUseCase {
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

  async execute({
    employeeId,
    exemplaryId,
    userId,
    rentalId,
    startDate,
    endDate,
  }: ReservationAttributes) {
    //verifica datas
    if (moment(startDate).isAfter(endDate))
      throw new AppError("Start date must be before the end date.", 406);

    const exemplary = await this.exemplaryRepository.findById(exemplaryId);
    if (!exemplary) throw new AppError("Exemplary not found.", 404);

    const book = await exemplary.getBook();
    if (!book) throw new AppError("Book not found.", 404);

    const user = await this.usersRepository.findById(userId);
    if (!user) throw new AppError("User not found.", 404);

    const employee = await this.employeeRepository.findById(employeeId);
    if (!employee) throw new AppError("Employee not found.", 404);

    //verifica se já não existe outro cadastro de Reserva do Exemplar
    //cuja Data Inicial e Final da Reserva não esteja dentro das Datas da Reserva que está sendo lançada
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

    const reservation = await this.reservationsRepository.create({
      employeeId,
      exemplaryId,
      userId,
      rentalId,
      startDate,
      endDate,
    });

    if (!reservation)
      throw new AppError("Error on create new Reservation", 406);

    return reservation;
  }
}

export { CreateReservationUseCase };
