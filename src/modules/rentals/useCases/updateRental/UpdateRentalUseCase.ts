import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { Rental } from "@database/models";
import {
  IRentalsRepository,
  RentalsAttributes,
} from "@modules/rentals/repositories/IRentalsRepository";
import { IReservationsRepository } from "@modules/reservations/repositories/IReservationsRepository";

import { AppError } from "@shared/errors/AppError";
import { IEmployeesRepository } from "@modules/employees/repositories/IEmployeesRepository";
import { IExemplaryRepository } from "@modules/exemplary/repositories/IExemplaryRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

@injectable()
class UpdateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("ReservationsRepository")
    private reservationsRepository: IReservationsRepository,
    @inject("EmployeesRepository")
    private employeesRepository: IEmployeesRepository,
    @inject("ExemplaryRepository")
    private exemplaryRepository: IExemplaryRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(
    rentalId: number,
    { employeeId, exemplaryId, userId }: RentalsAttributes
  ): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(rentalId);
    if (!rental) throw new AppError("Rental not found.", 404);

    const employee = await this.employeesRepository.findById(employeeId);
    if (!employee) throw new AppError("Employee not found.", 404);

    const exemplary = await this.exemplaryRepository.findById(exemplaryId);
    if (!exemplary) throw new AppError("Exemplary not found.", 404);

    const user = await this.usersRepository.findById(userId);
    if (!user) throw new AppError("User not found.", 404);

    /*
    	Somente deverão ser listados exemplares que não esteja alugado
        no momento do cadastramento do Aluguel;
    */
    const rentalExemplaryAlreadyExists =
      await this.rentalsRepository.findRentalsByExemplaryAndDate(exemplaryId);
    if (rentalExemplaryAlreadyExists.length > 1)
      throw new AppError("Exemplary already rented before.", 406);

    /*
        Verificar se não existe nenhuma Reserva efetuada para o exemplar,cuja data em que está sendo efetuado o Aluguel,
        esteja dentro da Data Inicial e Final de alguma reserva que não esteja preenchido o campo ID_ALUGUEL.
        Caso exista uma reserva para o Exemplar e que não seja do Usuário que esteja sendo lançado o Aluguel,
        deverá emitir mensagem ao Operador informando que existe reserva para o Exemplar e 
        não deve ser possibilitada a finalização do lançamento do Aluguel;
    */
    const reservationsByExemplaryAlreadyExists =
      await this.reservationsRepository.findReservationsByExemplaryDateNotUser(
        exemplaryId,
        userId
      );

    if (reservationsByExemplaryAlreadyExists.length > 0)
      throw new AppError("Exemplary already reserved for another user.", 406);

    const rentalUpdated = await this.rentalsRepository.update(rental, {
      employeeId,
      exemplaryId,
      userId,
    });

    if (!rentalUpdated) throw new AppError("Cannot update rental.", 400);

    return rental;
  }
}

export { UpdateRentalUseCase };
