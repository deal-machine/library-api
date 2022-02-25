import { EmployeeInMemory } from "./EmployeeInMemory";
import {
  EmployeesAttributes,
  IEmployeesRepository,
  ListEmployeesParams,
} from "../IEmployeesRepository";
import { PaginationProps } from "@pagination/types";

class EmployeeRepositoryInMemory implements IEmployeesRepository {
  employees: EmployeeInMemory[] = [];

  async list({
    page,
    elements,
  }: PaginationProps): Promise<ListEmployeesParams> {
    const allEmployees = await this.employees;

    return { employees: allEmployees, total: allEmployees.length };
  }

  async findById(id: number): Promise<EmployeeInMemory> {
    const employee = this.employees.find((emp) => emp.id === id);

    return employee;
  }

  async findByCpf(cpf: string): Promise<EmployeeInMemory> {
    const employee = this.employees.find((emp) => emp.cpf === cpf);

    return employee;
  }

  async findByEmail(email: string): Promise<EmployeeInMemory> {
    const employee = this.employees.find((emp) => emp.email === email);

    return employee;
  }

  async create({
    name,
    birthDate,
    cpf,
    address,
    email,
    password,
  }: EmployeesAttributes): Promise<EmployeeInMemory> {
    const employee = new EmployeeInMemory();

    Object.assign(employee, { name, birthDate, cpf, address, email, password });

    this.employees.push(employee);

    return employee;
  }

  async update(
    employee: EmployeeInMemory,
    { name, birthDate, address, email }: EmployeesAttributes
  ): Promise<void> {
    employee.name = name;
    employee.birthDate = birthDate;
    employee.address = address;
    employee.email = email;
  }

  async changeAdmin(employee: EmployeeInMemory): Promise<void> {
    employee.isAdmin = !employee.isAdmin;
  }

  async delete(id: number): Promise<void> {
    this.employees.filter((value, index) => {
      if (value.id == id) this.employees.splice(index, 1);
    });
  }
}

export { EmployeeRepositoryInMemory };
