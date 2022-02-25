import { Exemplary } from "@database/models";

interface ExemplaryAttributes {
  bookId?: number;
  sampleCode: string;
  provider: string;
  purchaseDate: Date;
}

interface IExemplaryRepository {
  getById(id: number): Promise<Exemplary>;
  findById(id: number): Promise<Exemplary>;
  list(
    bookId?: number,
    sampleCode?: string,
    provider?: string,
    purchaseStartDate?: Date | undefined,
    purchaseEndDate?: Date | undefined,
    createdStartDate?: Date | undefined,
    createdEndDate?: Date | undefined
  ): Promise<Exemplary[]>;

  create({
    bookId,
    sampleCode,
    provider,
    purchaseDate,
  }: ExemplaryAttributes): Promise<Exemplary>;

  update(
    exemplary: Exemplary,
    { bookId, sampleCode, provider, purchaseDate }: ExemplaryAttributes
  ): Promise<boolean>;

  delete(id: number): Promise<void>;
}

export { ExemplaryAttributes, IExemplaryRepository };
