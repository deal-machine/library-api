import { BookAttributes } from "../IBooksRepository";

class BookInMemory implements BookAttributes {
  id?: number;
  title: string;
  abstract: string;
  release: Date;

  constructor() {
    if (!this.id) this.id = Math.floor(Math.random() * 10) + 1;
  }
}
export { BookInMemory };
