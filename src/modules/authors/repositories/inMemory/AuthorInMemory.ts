import { AuthorsAttributes } from "../IAuthorsRepository";

class AuthorInMemory implements AuthorsAttributes {
  id: number;
  name: string;
  namePublication: string;

  constructor() {
    if (!this.id) this.id = Math.floor(Math.random() * 10) + 1;
  }
}

export { AuthorInMemory };
