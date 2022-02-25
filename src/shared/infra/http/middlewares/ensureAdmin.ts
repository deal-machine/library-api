import { EmployeesRepository } from "@modules/employees/repositories/implementations/EmployeesRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //   const { id } = request.employee;

  const employeesRepository = new EmployeesRepository();

  const employee = await employeesRepository.findById(1);

  if (!employee.isAdmin) throw new AppError("Employee is not admin.", 406);

  return next();
}
