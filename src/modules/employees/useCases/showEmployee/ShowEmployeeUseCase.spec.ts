import { IEmployeesRepository } from "@modules/employees/repositories/IEmployeesRepository";
import { EmployeeRepositoryInMemory } from "@modules/employees/repositories/inMemory/EmployeesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateEmployeeUseCase } from "../createEmployee/CreateEmployeeUseCase";
import { ShowEmployeeUseCase } from "./ShowEmployeeUseCase";

let employeesRepository: IEmployeesRepository;
let createEmployeeUseCase: CreateEmployeeUseCase;
let showEmployeeUseCase: ShowEmployeeUseCase;

describe("Show Employee", () => {
  beforeEach(() => {
    employeesRepository = new EmployeeRepositoryInMemory();
    createEmployeeUseCase = new CreateEmployeeUseCase(employeesRepository);
    showEmployeeUseCase = new ShowEmployeeUseCase(employeesRepository);
  });

  it("should be able to show an employee", async () => {
    const employee = await createEmployeeUseCase.execute({
      name: "Name Test",
      email: "emailTest@email.com",
      cpf: "12345678911",
      address: "Address Test",
      birthDate: new Date(),
      password: "12345678",
    });

    const foundEmployee = await showEmployeeUseCase.execute(
      Number(employee.id)
    );

    expect(foundEmployee).toHaveProperty("id");
  });

  it("should not be able to show a non existing employee", async () => {
    expect(async () => {
      const employee = await showEmployeeUseCase.execute(123);

      return employee;
    }).rejects.toBeInstanceOf(AppError);
  });
});
