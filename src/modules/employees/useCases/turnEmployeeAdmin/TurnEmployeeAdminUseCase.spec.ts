import { IEmployeesRepository } from "@modules/employees/repositories/IEmployeesRepository";
import { EmployeeRepositoryInMemory } from "../../repositories/inMemory/EmployeesRepositoryInMemory";
import { CreateEmployeeUseCase } from "../createEmployee/CreateEmployeeUseCase";
import { TurnEmployeeAdminUseCase } from "./TurnEmployeeAdminUseCase";

let employeesRepository: IEmployeesRepository;
let createEmployeeUseCase: CreateEmployeeUseCase;
let turnEmployeeAdminUseCase: TurnEmployeeAdminUseCase;

describe("Turn Employee Admin", () => {
  beforeEach(() => {
    employeesRepository = new EmployeeRepositoryInMemory();
    createEmployeeUseCase = new CreateEmployeeUseCase(employeesRepository);
    turnEmployeeAdminUseCase = new TurnEmployeeAdminUseCase(
      employeesRepository
    );
  });

  it("should be able to turn employee admin", async () => {
    const employee = await createEmployeeUseCase.execute({
      name: "Employee name to Change ADM Test",
      birthDate: new Date(),
      cpf: "14725836922",
      address: "Address To Test",
      email: "test@email.com.br",
      password: "123456789",
    });

    await turnEmployeeAdminUseCase.execute(employee.id);

    expect(employee).toHaveProperty("isAdmin", true);
  });
});
