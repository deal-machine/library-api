import { IEmployeesRepository } from "@modules/employees/repositories/IEmployeesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class TurnEmployeeAdminUseCase {
  constructor(
    @inject("EmployeesRepository")
    private employeesRepository: IEmployeesRepository
  ) {}

  async execute(id: number): Promise<void> {
    const employee = await this.employeesRepository.findById(id);

    if (!employee) throw new AppError("Employee not found.", 404);

    await this.employeesRepository.changeAdmin(employee);
  }
}

export { TurnEmployeeAdminUseCase };
