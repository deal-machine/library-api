import { EmployeesAttributes } from "../IEmployeesRepository";

class EmployeeInMemory implements EmployeesAttributes {
  id: number;
  name: string;
  birthDate: Date;
  cpf: string;
  address: string;
  isAdmin: boolean;
  email: string;
  password: string;

  constructor() {
    if (!this.id) this.id = Math.floor(Math.random() * 10) + 1;
    this.isAdmin = false;
  }
}

export { EmployeeInMemory };
