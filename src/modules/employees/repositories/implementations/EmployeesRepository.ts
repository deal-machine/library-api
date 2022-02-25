import { Employee } from "@shared/infra/sequelize/models";

import {
  EmployeesAttributes,
  IEmployeesRepository,
  ListEmployeesParams,
} from "../IEmployeesRepository";
import { PaginationProps } from "@pagination/types";

class EmployeesRepository implements IEmployeesRepository {
  async list({
    page,
    elements,
  }: PaginationProps): Promise<ListEmployeesParams> {
    const { count, rows } = await Employee.findAndCountAll({
      offset: page,
      limit: elements,
      order: ["name"],
    });

    return { employees: rows, total: count };
  }

  async findById(id: number): Promise<Employee> {
    const employee = await Employee.findByPk(id);

    return employee;
  }

  async findByCpf(cpf: string): Promise<Employee> {
    const employee = await Employee.findOne({ where: { cpf } });

    return employee;
  }

  async findByEmail(email: string): Promise<Employee> {
    const employee = await Employee.findOne({ where: { email } });

    return employee;
  }

  async create({
    name,
    email,
    cpf,
    birthDate,
    address,
    password,
  }: EmployeesAttributes): Promise<Employee> {
    const newEmployee = await Employee.create({
      name,
      email,
      cpf,
      birthDate,
      address,
      password,
    });

    return newEmployee;
  }

  async update(
    employee: Employee,
    { name, birthDate, address, email }: EmployeesAttributes
  ): Promise<void> {
    await employee.update({
      name,
      birthDate,
      address,
      email,
    });

    return employee;
  }

  async changeAdmin(employee: Employee): Promise<void> {
    await employee.update({ isAdmin: !employee.isAdmin });
  }

  async delete(id: number): Promise<void> {
    await Employee.destroy({ where: { id } });
  }
}

export { EmployeesRepository };
