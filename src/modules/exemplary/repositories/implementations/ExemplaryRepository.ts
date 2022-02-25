import { Op } from "sequelize";

import { Exemplary, Book } from "@database/models";

import {
  ExemplaryAttributes,
  IExemplaryRepository,
} from "../IExemplaryRepository";
import { exemplaryRouter } from "@shared/infra/http/routes/exemplary.routes";

class ExemplaryRepository implements IExemplaryRepository {
  async getById(id: number) {
    const exemplary = await Exemplary.findOne({
      where: { id },
      attributes: ["sampleCode", "provider", "purchaseDate", "createdAt"],
      include: { model: Book, as: "book", attributes: ["title"] },
    });

    return exemplary;
  }
  async findById(id: number) {
    const exemplary = await Exemplary.findOne({ where: { id } });

    return exemplary;
  }
  async list(
    book: number,
    sampleCode: string,
    provider: string,
    purchaseStartDate: Date | undefined,
    purchaseEndDate: Date | undefined,
    createdStartDate: Date | undefined,
    createdEndDate: Date | undefined
  ): Promise<Exemplary[]> {
    const exemplary = await Exemplary.findAll({
      where: {
        [Op.and]: [
          {
            bookId: book == 0 ? { [Op.not]: null } : { [Op.eq]: book },
          },
          {
            purchaseDate:
              purchaseStartDate !== undefined
                ? purchaseEndDate !== undefined
                  ? {
                      [Op.between]: [purchaseStartDate, purchaseEndDate],
                    }
                  : { [Op.gte]: purchaseStartDate }
                : purchaseEndDate !== undefined
                ? { [Op.lte]: purchaseEndDate }
                : { [Op.ne]: null },
          },
          {
            createdAt:
              createdStartDate !== undefined
                ? createdEndDate !== undefined
                  ? { [Op.between]: [createdStartDate, createdEndDate] }
                  : { [Op.gte]: createdStartDate }
                : createdEndDate !== undefined
                ? { [Op.lte]: createdEndDate }
                : { [Op.ne]: null },
          },
          { sampleCode: { [Op.iLike]: `%${sampleCode}%` } },
          { provider: { [Op.iLike]: `%${provider}%` } },
        ],
      },
      include: [{ model: Book, as: "book", attributes: ["title"] }],
      attributes: ["sampleCode", "purchaseDate", "provider", "createdAt"],
    });

    return exemplary;
  }

  async create({
    sampleCode,
    purchaseDate,
    provider,
    bookId,
  }: ExemplaryAttributes): Promise<Exemplary> {
    const newExemplary = await Exemplary.create({
      bookId,
      sampleCode,
      purchaseDate,
      provider,
    });

    return newExemplary;
  }

  async update(
    exemplary: Exemplary,
    { bookId, sampleCode, provider, purchaseDate }: ExemplaryAttributes
  ): Promise<boolean> {
    return await exemplary.update({
      bookId,
      sampleCode,
      provider,
      purchaseDate,
    });
  }

  async delete(id: number): Promise<void> {
    await Exemplary.destroy({ where: { id } });
  }
}

export { ExemplaryRepository };
