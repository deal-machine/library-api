import {
  EmployeesAttributes,
  IEmployeesRepository,
} from "@modules/employees/repositories/IEmployeesRepository";
import { EmployeeRepositoryInMemory } from "@modules/employees/repositories/inMemory/EmployeesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateEmployeeUseCase } from "./CreateEmployeeUseCase";

let employeesRepository: IEmployeesRepository;
let createEmployeeUseCase: CreateEmployeeUseCase;

describe("Create Employee", () => {
  beforeEach(() => {
    employeesRepository = new EmployeeRepositoryInMemory();
    createEmployeeUseCase = new CreateEmployeeUseCase(employeesRepository);
  });

  it("should be able to create a new employee", async () => {
    const employee: EmployeesAttributes = {
      name: "Name Test",
      cpf: "12345678999",
      email: "email@test.com.br",
      address: "Address Test",
      birthDate: new Date(),
      password: "123456789",
    };

    const newEmployee = await createEmployeeUseCase.execute({
      name: employee.name,
      cpf: employee.cpf,
      email: employee.email,
      address: employee.address,
      birthDate: employee.birthDate,
      password: employee.password,
    });
    expect(newEmployee).toHaveProperty("id");
  });

  it("should be able to create a employee ", async () => {
    const employee = await createEmployeeUseCase.execute({
      name: "Employee is not admin",
      birthDate: new Date(),
      cpf: "14725836923",
      address: "Address To Test",
      email: "testTwo@email.com.br",
      password: "123456789",
    });

    expect(employee).toHaveProperty("isAdmin", false);
  });

  it("should not be able to create when email already exists", async () => {
    const employee: EmployeesAttributes = {
      name: "Name test",
      cpf: "12345614700",
      email: "email@test.com",
      address: "Address Test",
      birthDate: new Date(),
      password: "12345678*",
    };
    try {
      const newEmployee = await createEmployeeUseCase.execute({
        name: employee.name,
        cpf: employee.cpf,
        email: employee.email,
        address: employee.address,
        birthDate: employee.birthDate,
        password: employee.password,
      });
      await createEmployeeUseCase.execute({
        name: newEmployee.name,
        cpf: "12345600741",
        email: newEmployee.email,
        address: newEmployee.address,
        birthDate: newEmployee.birthDate,
        password: employee.password,
      });
    } catch (e) {
      expect(e).toBeInstanceOf(AppError);
    }
  });

  it("should not be able to create when CPF already exists", async () => {
    try {
      const employee1 = await createEmployeeUseCase.execute({
        name: "Name Test",
        cpf: "12345678910",
        email: "email@test.com",
        address: "Address Test",
        birthDate: new Date(),
        password: "12345678910",
      });

      const employee2 = await createEmployeeUseCase.execute({
        name: "Name Test 2",
        cpf: "12345678910",
        email: "email2@test.com",
        address: "Address Test 2",
        birthDate: new Date(),
        password: "12345678911",
      });
    } catch (e) {
      expect(e).toBeInstanceOf(AppError);
    }
  });

  it("should not be able to create a password less than eight characters", async () => {
    expect(async () => {
      const employee = await createEmployeeUseCase.execute({
        name: "Name Test",
        cpf: "12345678913",
        email: "email1@test.com",
        address: "Address Test",
        birthDate: new Date(),
        password: "1234567",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
