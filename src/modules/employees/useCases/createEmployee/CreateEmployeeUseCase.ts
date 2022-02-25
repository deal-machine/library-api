import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

import { Employee } from "@shared/infra/sequelize/models";
import {
  EmployeesAttributes,
  IEmployeesRepository,
} from "../../repositories/IEmployeesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateEmployeeUseCase {
  constructor(
    @inject("EmployeesRepository")
    private employeesRepository: IEmployeesRepository
  ) {}

  async execute({
    name,
    birthDate,
    cpf,
    address,
    email,
    password,
  }: EmployeesAttributes): Promise<Employee> {
    const emailAlreadyExists = await this.employeesRepository.findByEmail(
      email
    );
    if (emailAlreadyExists) throw new AppError("Email already exists.", 409);

    const cpfAlreadyExists = await this.employeesRepository.findByCpf(cpf);
    if (cpfAlreadyExists) throw new AppError("CPF already exists.", 409);

    if (password.length < 8)
      throw new AppError(
        "Password must be have more than eight characters.",
        406
      );
    const passwordHash = await hash(password, 8);

    const employee = await this.employeesRepository.create({
      name,
      birthDate,
      cpf,
      address,
      email,
      password: passwordHash,
    });

    return employee;
  }
}

export { CreateEmployeeUseCase };
