import { User } from "@database/models";
import { PaginationProps } from "@pagination/types";

interface UserAttributes {
  name: string;
  email: string;
  cpf: string;
  address: string;
  birthDate: Date;
}
interface ListUsersParams {
  users: User[];
  currentPage?: number;
  total: number;
}
interface IUsersRepository {
  findByCpf(cpf: string): Promise<User>;

  findById(id: number): Promise<User>;

  list({ page, elements }: PaginationProps): Promise<ListUsersParams>;

  create({
    name,
    email,
    cpf,
    address,
    birthDate,
  }: UserAttributes): Promise<User>;

  update(
    user: User,
    { name, email, cpf, address, birthDate }: UserAttributes
  ): Promise<boolean>;

  delete(id: number): Promise<void>;
}

export { IUsersRepository, UserAttributes, ListUsersParams };
