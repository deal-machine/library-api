import { inject, injectable } from "tsyringe";

import { Employee } from "@shared/infra/sequelize/models";
import { AppError } from "@shared/errors/AppError";
import {
  EmployeesAttributes,
  IEmployeesRepository,
} from "../../repositories/IEmployeesRepository";

@injectable()
class UpdateEmployeeUseCase {
  constructor(
    @inject("EmployeesRepository")
    private employeesRepository: IEmployeesRepository
  ) {}

  async execute(
    id: number,
    { name, birthDate, cpf, address, email }: EmployeesAttributes
  ): Promise<Employee> {
    const employee = await this.employeesRepository.findById(id);
    if (!employee) throw new AppError("Employee not found.", 406);

    const emailAlreadyExists = await this.employeesRepository.findByEmail(
      email
    );
    if (emailAlreadyExists) throw new AppError("Email already exists.", 409);

    const cpfAlreadyExists = await this.employeesRepository.findByCpf(cpf);
    if (cpfAlreadyExists) throw new AppError("CPF already exists.", 409);

    await this.employeesRepository.update(employee, {
      name,
      birthDate,
      address,
      email,
    });

    return employee;
  }
}

export { UpdateEmployeeUseCase };
