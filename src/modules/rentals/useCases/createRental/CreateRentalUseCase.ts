import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import moment from "moment";

import { Rental } from "@database/models";
import {
    IRentalsRepository,
    RentalsAttributes,
} from "@modules/rentals/repositories/IRentalsRepository";
// import { IReservationsRepository } from "@modules/reservations/repositories/IReservationsRepository";

import { AppError } from "@shared/errors/AppError";
import { IEmployeesRepository } from "@modules/employees/repositories/IEmployeesRepository";
import { IExemplaryRepository } from "@modules/exemplary/repositories/IExemplaryRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        // @inject("ReservationsRepository")
        // private reservationsRepository: IReservationsRepository,
        @inject("EmployeesRepository")
        private employeesRepository: IEmployeesRepository,
        @inject("ExemplaryRepository")
        private exemplaryRepository: IExemplaryRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({
        employeeId,
        exemplaryId,
        userId,
    }: RentalsAttributes): Promise<Rental> {
        //verificando outras entidades

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
        if (rentalExemplaryAlreadyExists.length > 0)
            throw new AppError("Exemplary already rented before.", 406);

        /*
            Verificar se não existe nenhuma Reserva efetuada para o exemplar,cuja data em que está sendo efetuado o Aluguel,
            esteja dentro da Data Inicial e Final de alguma reserva que não esteja preenchido o campo ID_ALUGUEL.
            Caso exista uma reserva para o Exemplar e que não seja do Usuário que esteja sendo lançado o Aluguel,
            deverá emitir mensagem ao Operador informando que existe reserva para o Exemplar e 
            não deve ser possibilitada a finalização do lançamento do Aluguel;
        */
        const reservationsByExemplaryAlreadyExists =
            await this.rentalsRepository.findReservationsByExemplaryAndVerifyUser(
                exemplaryId,
                userId
            );

        if (reservationsByExemplaryAlreadyExists.length > 0)
            throw new AppError("Exemplary already reserved for another user.", 406);

        /*
            A Data Prevista para finalização,
            deverá ser preenchida com 7 dias úteis em relação a Data de Lançamento do Aluguel.
            Sábado e Domingo não são considerados dias úteis;
        */
        function workDays() {
            let expectedReturnDate = new Date();
            expectedReturnDate = moment(expectedReturnDate).add(10, "d").toDate();
            if (moment(expectedReturnDate).day() == 0)
                expectedReturnDate = moment(expectedReturnDate).add(1, "d").toDate();
            else if (moment(expectedReturnDate).day() == 6)
                expectedReturnDate = moment(expectedReturnDate).add(2, "d").toDate();

            return expectedReturnDate;
        }

        /*
            Ao efetuar o Cadastramento do Aluguel para um Usuário e Exemplar
            que possua uma Reserva para o Usuário e Exemplar que está sendo efetuado o Aluguel, 
            deverá ser atualizada na tabela Reserva o ID_ALUGUEL referente ao Aluguel efetuado;
        */
        const reservationByExemplaryAndUser =
            await this.rentalsRepository.getReservationByExemplaryAndUser(
                exemplaryId,
                userId
            );

        let newRental: Rental;

        if (reservationByExemplaryAndUser != null) {
            newRental = await this.rentalsRepository.createRentalAndUpdateReservation(
                reservationByExemplaryAndUser,
                {
                    employeeId,
                    exemplaryId,
                    userId,
                    rentalDate: new Date(),
                    expectedReturnDate: workDays(),
                }
            );
        } else {
            newRental = await this.rentalsRepository.create({
                employeeId,
                exemplaryId,
                userId,
                rentalDate: new Date(),
                expectedReturnDate: workDays(),
            });
        }

        return newRental;
    }
}

export { CreateRentalUseCase };
