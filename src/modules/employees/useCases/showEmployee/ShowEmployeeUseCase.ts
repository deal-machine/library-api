import { inject, injectable } from "tsyringe";
import { Employee } from "@shared/infra/sequelize/models";
import { AppError } from "@shared/errors/AppError";

import { IEmployeesRepository } from "../../repositories/IEmployeesRepository";

@injectable()
class ShowEmployeeUseCase {
  constructor(
    @inject("EmployeesRepository")
    private employeesRepository: IEmployeesRepository
  ) {}

  async execute(id: number): Promise<Employee> {
    const employee = await this.employeesRepository.findById(id);

    if (!employee) throw new AppError("Employee not foud.", 406);

    employee.password = undefined;

    return employee;
  }
}
export { ShowEmployeeUseCase };
