import { Employee } from "@database/models";
import { PaginationProps } from "@pagination/types";

interface EmployeesAttributes {
  name?: string;
  birthDate?: Date;
  cpf?: string;
  address?: string;
  email?: string;
  password?: string;
}

interface ListEmployeesParams {
  employees: EmployeesAttributes[];
  currentPage?: number;
  total: number;
}

interface IEmployeesRepository {
  list({ page, elements }: PaginationProps): Promise<ListEmployeesParams>;

  findById(id: number): Promise<Employee>;

  findByCpf(cpf: string): Promise<Employee>;

  findByEmail(email: string): Promise<Employee>;

  create({
    name,
    birthDate,
    cpf,
    address,
    email,
    password,
  }: EmployeesAttributes): Promise<Employee>;

  update(
    employee: Employee,
    { name, birthDate, address, email }: EmployeesAttributes
  ): Promise<void>;

  changeAdmin(employee: Employee): Promise<void>;

  delete(id: number): Promise<void>;
}

export { IEmployeesRepository, EmployeesAttributes, ListEmployeesParams };
