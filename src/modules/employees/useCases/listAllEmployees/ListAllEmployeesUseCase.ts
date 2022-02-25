import { injectable, inject } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import {
  IEmployeesRepository,
  ListEmployeesParams,
} from "../../repositories/IEmployeesRepository";
import { PaginationProps } from "@pagination/types";

@injectable()
class ListAllEmployeesUseCase {
  constructor(
    @inject("EmployeesRepository")
    private employeesRepository: IEmployeesRepository
  ) {}

  async execute({
    page,
    elements,
  }: PaginationProps): Promise<ListEmployeesParams> {
    let offset = (page - 1) * elements;
    if (page == 1) offset = 0;

    const { employees, total } = await this.employeesRepository.list({
      page: offset,
      elements,
    });

    if (!employees) throw new AppError("Employees not found.", 404);

    return { employees, total, currentPage: page };
  }
}
export { ListAllEmployeesUseCase };
