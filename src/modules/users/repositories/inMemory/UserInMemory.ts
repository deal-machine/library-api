import { UserAttributes } from "../IUsersRepository";

class UserInMemory implements UserAttributes {
  id: number;
  name: string;
  birthDate: Date;
  cpf: string;
  address: string;
  email: string;

  constructor() {
    if (!this.id) this.id = Math.floor(Math.random() * 10) + 1;
  }
}

export { UserInMemory };
