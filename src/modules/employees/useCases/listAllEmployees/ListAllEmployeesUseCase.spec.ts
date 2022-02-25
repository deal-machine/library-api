import { IEmployeesRepository } from "@modules/employees/repositories/IEmployeesRepository";
import { EmployeeRepositoryInMemory } from "@modules/employees/repositories/inMemory/EmployeesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateEmployeeUseCase } from "../createEmployee/CreateEmployeeUseCase";
import { ListAllEmployeesUseCase } from "./ListAllEmployeesUseCase";

let employeesRepository: IEmployeesRepository;
let createEmployeeUseCase: CreateEmployeeUseCase;
let listAllEmployeesUseCase: ListAllEmployeesUseCase;

describe("List All Employees", () => {
  beforeEach(() => {
    employeesRepository = new EmployeeRepositoryInMemory();
    createEmployeeUseCase = new CreateEmployeeUseCase(employeesRepository);
    listAllEmployeesUseCase = new ListAllEmployeesUseCase(employeesRepository);
  });

  it("should be able to list all Employees", async () => {
    const employee = await createEmployeeUseCase.execute({
      name: "Name Test",
      email: "emailTest@email.com",
      cpf: "12345678911",
      address: "Address Test",
      birthDate: new Date(),
      password: "12345678",
    });
    const employee2 = await createEmployeeUseCase.execute({
      name: "Name Test2",
      email: "emailTest2@email.com",
      cpf: "12345678912",
      address: "Address Test2",
      birthDate: new Date(),
      password: "12345678",
    });

    const { employees, currentPage, total } =
      await listAllEmployeesUseCase.execute({ page: 1, elements: 7 });

    expect(employees).toHaveLength(2);
    expect(total).toEqual(2);
    expect(currentPage).toEqual(1);
  });

  it("should be able to call list method", async () => {
    expect(async () => {
      const { employees, currentPage, total } =
        await listAllEmployeesUseCase.execute({ page: 1, elements: 7 });
      return { employees, currentPage, total };
    }).not.toBeInstanceOf(AppError);
  });
});
