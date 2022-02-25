import "reflect-metadata";

import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

import { IEmployeesRepository } from "../../repositories/IEmployeesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  employee: { name: string; email: string };
  token: string;
}

@injectable()
class AuthenticateEmployeeUseCase {
  constructor(
    @inject("EmployeesRepository")
    private employeesRepository: IEmployeesRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const employee = await this.employeesRepository.findByEmail(email);

    if (!employee) throw new AppError("Email or password incorrect.", 401);

    const isPasswordCorrect = await compare(password, employee.password);

    if (!isPasswordCorrect)
      throw new AppError("Email or password incorrect.", 401);

    const token = sign(
      { name: employee.name, email: employee.email },
      "6e1f7461f9dbf4fa77d31d8cfe04b2e8",
      {
        subject: `${employee.id}`,
        expiresIn: "1d",
      }
    );

    const tokenReturn: IResponse = {
      token,
      employee: { name: employee.name, email: employee.email },
    };

    return tokenReturn;
  }
}

export { AuthenticateEmployeeUseCase };
