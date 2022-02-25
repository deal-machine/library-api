import {
  ExemplaryAttributes,
  IExemplaryRepository,
} from "../IExemplaryRepository";
import { ExemplaryInMemory } from "./ExemplaryInMemory";

class ExemplaryRepositoryInMemory implements IExemplaryRepository {
  exemplaries: ExemplaryInMemory[] = [];

  async getById(id: number): Promise<ExemplaryInMemory> {
    const exemplary = this.exemplaries.find((exemp) => exemp.id === id);

    return exemplary;
  }

  async findById(id: number): Promise<ExemplaryInMemory> {
    const exemplary = this.exemplaries.find((exemp) => exemp.id === id);

    return exemplary;
  }

  async list(
    bookId?: number,
    sampleCode?: string,
    provider?: string,
    purchaseStartDate?: Date,
    purchaseEndDate?: Date,
    createdStartDate?: Date,
    createdEndDate?: Date
  ): Promise<ExemplaryInMemory[]> {
    return this.exemplaries;
  }

  async create({
    bookId,
    sampleCode,
    provider,
    purchaseDate,
  }: ExemplaryAttributes): Promise<ExemplaryInMemory> {
    const exemplary: ExemplaryInMemory = new ExemplaryInMemory();

    Object.assign(exemplary, { bookId, sampleCode, provider, purchaseDate });

    this.exemplaries.push(exemplary);

    return exemplary;
  }

  async update(
    exemplary: ExemplaryInMemory,
    { bookId, sampleCode, provider, purchaseDate }: ExemplaryAttributes
  ): Promise<boolean> {
    exemplary.bookId = bookId;
    exemplary.sampleCode = sampleCode;
    exemplary.provider = provider;
    exemplary.purchaseDate = purchaseDate;

    return true;
  }
  async delete(id: number): Promise<void> {
    this.exemplaries.map((exemplary, index) => {
      if (exemplary.id === id) this.exemplaries.splice(index, 1);
    });
  }
}

export { ExemplaryRepositoryInMemory };
