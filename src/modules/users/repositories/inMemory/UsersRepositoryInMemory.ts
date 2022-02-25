import { UserInMemory } from "./UserInMemory";
import {
  IUsersRepository,
  ListUsersParams,
  UserAttributes,
} from "../IUsersRepository";
import { PaginationProps } from "@pagination/types";

class UsersRepositoryInMemory implements IUsersRepository {
  users: UserInMemory[] = [];

  async findByCpf(cpf: string): Promise<UserInMemory> {
    const user = this.users.find((u) => u.cpf === cpf);

    return user;
  }

  async findById(id: number): Promise<UserInMemory> {
    const user = this.users.find((u) => u.id === id);

    return user;
  }

  async list({ page, elements }: PaginationProps): Promise<ListUsersParams> {
    const allAuthors = this.users;

    return { users: allAuthors, total: allAuthors.length };
  }

  async update(
    user: UserInMemory,
    { name, email, cpf, address, birthDate }: UserAttributes
  ): Promise<boolean> {
    user.name = name;
    user.email = email;
    user.cpf = cpf;
    user.address = address;
    user.birthDate = birthDate;

    return true;
  }

  async delete(id: number): Promise<void> {
    this.users.map((usr, index) => {
      if (usr.id === id) this.users.splice(index, 1);
    });
  }

  async create({
    name,
    email,
    cpf,
    address,
    birthDate,
  }: UserAttributes): Promise<UserInMemory> {
    const user = new UserInMemory();

    Object.assign(user, { name, email, cpf, address, birthDate });

    this.users.push(user);

    return user;
  }
}

export { UsersRepositoryInMemory };
