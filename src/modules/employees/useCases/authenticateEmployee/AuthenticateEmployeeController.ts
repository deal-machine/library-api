import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateEmployeeUseCase } from "./AuthenticateEmployeeUseCase";

class AuthenticateEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateEmployeeUseCase = container.resolve(
      AuthenticateEmployeeUseCase
    );

    const tokenInfo = await authenticateEmployeeUseCase.execute({
      email,
      password,
    });

    return response.status(200).json(tokenInfo);
  }
}

export { AuthenticateEmployeeController };
