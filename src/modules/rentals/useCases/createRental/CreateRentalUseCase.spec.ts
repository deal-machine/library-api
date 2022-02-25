import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import { IReservationsRepository } from "@modules/reservations/repositories/IReservationsRepository";
import { IEmployeesRepository } from "@modules/employees/repositories/IEmployeesRepository";
import { IExemplaryRepository } from "@modules/exemplary/repositories/IExemplaryRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { UsersRepositoryInMemory } from "@modules/users/repositories/inMemory/UsersRepositoryInMemory";
import { ExemplaryRepositoryInMemory } from "@modules/exemplary/repositories/inMemory/ExemplaryRepositoryInMemory";
import { EmployeeRepositoryInMemory } from "@modules/employees/repositories/inMemory/EmployeesRepositoryInMemory";

let rentalsRepository: IRentalsRepository;
let reservationsRepository: IReservationsRepository;
let employeesRepository: IEmployeesRepository;
let exemplaryRepository: IExemplaryRepository;
let usersRepository: IUsersRepository;

let createRentalUseCase: CreateRentalUseCase;

describe("Create Rental", () => {
    beforeEach(() => {
        // rentalsRepository = new RentalsRepositoryInMemory();
        // reservationsRepository = new ReservationsRepositoryInMemory();
        employeesRepository = new EmployeeRepositoryInMemory();
        exemplaryRepository = new ExemplaryRepositoryInMemory();
        usersRepository = new UsersRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepository,
            employeesRepository,
            exemplaryRepository,
            usersRepository
        );
    });

    it("should be able to create a rental", async () => {});

    it("should not be able to create a new rental when the user is not exists", async () => {});
});
