import { ExemplaryAttributes } from "../IExemplaryRepository";

class ExemplaryInMemory implements ExemplaryAttributes {
  id?: number;
  bookId: number;
  sampleCode: string;
  provider: string;
  purchaseDate: Date;

  constructor() {
    if (!this.id) this.id = Math.floor(Math.random() * 10) + 1;
  }
}

export { ExemplaryInMemory };
