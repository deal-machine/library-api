import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { IEmployeesRepository } from "../../repositories/IEmployeesRepository";

@injectable()
class DeleteEmployeeUseCase {
  constructor(
    @inject("EmployeesRepository")
    private employeesRepository: IEmployeesRepository
  ) {}
  async execute(id: number): Promise<void> {
    const employee = await this.employeesRepository.findById(id);

    if (!employee) throw new AppError("Employee not exists.", 404);

    await this.employeesRepository.delete(id);
  }
}

export { DeleteEmployeeUseCase };
