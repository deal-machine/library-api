import { IEmployeesRepository } from "@modules/employees/repositories/IEmployeesRepository";
import { EmployeeRepositoryInMemory } from "@modules/employees/repositories/inMemory/EmployeesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateEmployeeUseCase } from "../createEmployee/CreateEmployeeUseCase";
import { DeleteEmployeeUseCase } from "./DeleteEmployeeUseCase";

let employeesRepository: IEmployeesRepository;
let createEmployeeUseCase: CreateEmployeeUseCase;
let deleteEmployeeUseCase: DeleteEmployeeUseCase;

describe("Delete Employee", () => {
  beforeEach(() => {
    employeesRepository = new EmployeeRepositoryInMemory();
    createEmployeeUseCase = new CreateEmployeeUseCase(employeesRepository);
    deleteEmployeeUseCase = new DeleteEmployeeUseCase(employeesRepository);
  });

  it("should be able to delete an Employee", async () => [
    expect(async () => {
      const employee = await createEmployeeUseCase.execute({
        name: "Name Test",
        email: "emailTest@email.com",
        cpf: "12345678911",
        address: "Address Test",
        birthDate: new Date(),
        password: "12345678",
      });

      await deleteEmployeeUseCase.execute(Number(employee.id));
    }).not.toBeInstanceOf(AppError),
  ]);

  it("should not be able to delete a non existing Employee", async () => [
    expect(async () => {
      await deleteEmployeeUseCase.execute(123);
    }).rejects.toBeInstanceOf(AppError),
  ]);
});
