import { EmployeesAttributes } from "../../repositories/IEmployeesRepository";
import { AuthenticateEmployeeUseCase } from "./AuthenticateEmployeeUseCase";
import { CreateEmployeeUseCase } from "../createEmployee/CreateEmployeeUseCase";
import { EmployeeRepositoryInMemory } from "../../repositories/inMemory/EmployeesRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

let authenticateEmployeeUseCase: AuthenticateEmployeeUseCase;
let employeesRepositoryInMemory: EmployeeRepositoryInMemory;
let createEmployeeUseCase: CreateEmployeeUseCase;

describe("Authenticate Employee", () => {
  beforeEach(() => {
    employeesRepositoryInMemory = new EmployeeRepositoryInMemory();

    authenticateEmployeeUseCase = new AuthenticateEmployeeUseCase(
      employeesRepositoryInMemory
    );
    createEmployeeUseCase = new CreateEmployeeUseCase(
      employeesRepositoryInMemory
    );
  });

  it("should be able to authenticate employee", async () => {
    const employeeTest: EmployeesAttributes = {
      name: "Employe Name Test",
      cpf: "12345678911",
      birthDate: new Date(),
      address: "Address Test",
      email: "email@test.com",
      password: "PasswordTest",
    };

    const employee = await createEmployeeUseCase.execute(employeeTest);

    const result = await authenticateEmployeeUseCase.execute({
      email: employee.email,
      password: employeeTest.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate employee with incorrect email", () => {
    expect(async () => {
      await authenticateEmployeeUseCase.execute({
        email: "incorrectEmail@test.com",
        password: "PasswordTest",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate employee with incorrect password", () => {
    expect(async () => {
      const employeeTest: EmployeesAttributes = {
        name: "Employe Name Test",
        cpf: "12345678911",
        birthDate: new Date(),
        address: "Address Test",
        email: "email@test.com",
        password: "PasswordTest",
      };

      const employee = await createEmployeeUseCase.execute(employeeTest);

      await authenticateEmployeeUseCase.execute({
        email: employee.email,
        password: "IncorrectPasswordTest",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
