import { Request, NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";

import { EmployeesRepository } from "../../../../modules/employees/repositories/implementations/EmployeesRepository";

import { AppError } from "../../../errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new AppError("Missing token.", 401);

    const [type, token] = authHeader.split(" ");

    if (type != "Bearer") throw new AppError("Invalid token.", 401);

    const { sub: id } = verify(
      token,
      "6e1f7461f9dbf4fa77d31d8cfe04b2e8"
    ) as IPayload;

    const employeesRepository = new EmployeesRepository();

    const employeeExists = await employeesRepository.findById(Number(id));

    if (!employeeExists) throw new AppError("Employee not authenticated.", 401);

    Object.assign(request, { employeeExists });

    next();
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}
