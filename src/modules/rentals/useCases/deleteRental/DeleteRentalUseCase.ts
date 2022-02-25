import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute(id: number): Promise<void> {
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) throw new AppError("Rental not found.", 404);

    if (rental.returnDate != null)
      throw new AppError("Cannot delete a complete rental.", 406);

    await this.rentalsRepository.delete(id);
  }
}

export { DeleteRentalUseCase };
