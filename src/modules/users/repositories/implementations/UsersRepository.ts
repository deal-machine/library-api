import { User } from "@database/models";
import {
  IUsersRepository,
  UserAttributes,
  ListUsersParams,
} from "../IUsersRepository";

import { PaginationProps } from "@pagination/types";

class UsersRepository implements IUsersRepository {
  async findByCpf(cpf: string): Promise<User> {
    const user = await User.findOne({ where: { cpf } });

    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await User.findOne({ where: { id } });

    return user;
  }

  async list({ page, elements }: PaginationProps): Promise<ListUsersParams> {
    const { count, rows } = await User.findAndCountAll({
      offset: page,
      limit: elements,
      order: ["name"],
    });

    return { users: rows, total: count };
  }

  async create({
    name,
    email,
    cpf,
    address,
    birthDate,
  }: UserAttributes): Promise<User> {
    const user = await User.create({
      name,
      email,
      cpf,
      address,
      birthDate,
    });

    return user;
  }

  async update(
    user: User,
    { name, email, cpf, address, birthDate }: UserAttributes
  ): Promise<boolean> {
    await user.update({ name, email, cpf, address, birthDate });

    return true;
  }

  async delete(id: number): Promise<void> {
    await User.destroy({ where: { id } });
  }
}

export { UsersRepository };
