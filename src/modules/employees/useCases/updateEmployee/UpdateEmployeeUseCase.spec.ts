import { IEmployeesRepository } from "@modules/employees/repositories/IEmployeesRepository";
import { EmployeeRepositoryInMemory } from "@modules/employees/repositories/inMemory/EmployeesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateEmployeeUseCase } from "../createEmployee/CreateEmployeeUseCase";
import { UpdateEmployeeUseCase } from "./UpdateEmployeeUseCase";

let employeesRepository: IEmployeesRepository;
let createEmployeeUseCase: CreateEmployeeUseCase;
let updateEmployeeUseCase: UpdateEmployeeUseCase;

describe("Update Employee", () => {
  beforeEach(() => {
    employeesRepository = new EmployeeRepositoryInMemory();

    createEmployeeUseCase = new CreateEmployeeUseCase(employeesRepository);
    updateEmployeeUseCase = new UpdateEmployeeUseCase(employeesRepository);
  });

  it("should be able to update an employee", async () => {
    const employee = await createEmployeeUseCase.execute({
      name: "Name Test",
      email: "emailTest@email.com",
      cpf: "12345678911",
      address: "Address Test",
      birthDate: new Date(),
      password: "12345678",
    });

    const employeeUpdated = await updateEmployeeUseCase.execute(
      Number(employee.id),
      {
        name: "New Name",
        birthDate: new Date(),
        cpf: "12345678900",
        email: "newemailtest@test.com",
        address: "newAddress",
      }
    );

    expect(employeeUpdated).toHaveProperty("id");
  });

  it("should not be able to update when email already exists", async () => {
    expect(async () => {
      const employee = await createEmployeeUseCase.execute({
        name: "Name Test",
        email: "emailTest@email.com",
        cpf: "12345678911",
        address: "Address Test",
        birthDate: new Date(),
        password: "12345678",
      });

      const employeeUpdated = await updateEmployeeUseCase.execute(
        Number(employee.id),
        {
          name: "New Name",
          birthDate: new Date(),
          cpf: "12345678900",
          email: "emailTest@email.com",
          address: "newAddress",
        }
      );
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update when cpf already exists", async () => {
    expect(async () => {
      const employee = await createEmployeeUseCase.execute({
        name: "Name Test",
        email: "emailTest@email.com",
        cpf: "12345678911",
        address: "Address Test",
        birthDate: new Date(),
        password: "12345678",
      });

      const employeeUpdated = await updateEmployeeUseCase.execute(
        Number(employee.id),
        {
          name: "New Name",
          birthDate: new Date(),
          cpf: "12345678911",
          email: "emailTest2@email.com",
          address: "newAddress",
        }
      );
    }).rejects.toBeInstanceOf(AppError);
  });
});
