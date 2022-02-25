import { Rental, Reservation } from "@database/models";

interface RentalsListParameters {
  employeeId?: number;
  exemplaryId?: number;
  userId?: number;
  bookId?: number;
  sampleCode?: string;
  rentalStartDate: Date;
  rentalEndDate: Date;

  expectedReturnStartDate: Date;
  expectedReturnEndDate: Date;

  returnStartDate: Date;
  returnEndDate: Date;
}

interface RentalsAttributes {
  employeeId: number;
  exemplaryId: number;
  userId: number;
  rentalDate?: Date;
  expectedReturnDate?: Date;
  returnDate?: Date;
  penalty?: number;
}

interface IRentalsRepository {
  list({
    employeeId,
    exemplaryId,
    userId,
    bookId,
    sampleCode,
    rentalStartDate,
    rentalEndDate,
  }: RentalsListParameters): Promise<Rental[]>;
  findAndCountRentalsByExemplary(exemplaryId: number): Promise<Number>;
  findRentalsByExemplaryAndDate(exemplaryId: number): Promise<Rental[]>;
  getById(id: number): Promise<Rental>;

  findById(id: number): Promise<Rental>;

  create({
    employeeId,
    exemplaryId,
    userId,
    rentalDate,
    expectedReturnDate,
  }: RentalsAttributes): Promise<Rental>;

  createRentalAndUpdateReservation(
    reservation: Reservation,
    {
      employeeId,
      exemplaryId,
      userId,
      rentalDate,
      expectedReturnDate,
    }: RentalsAttributes
  ): Promise<Rental>;

  update(
    rental: Rental,
    { employeeId, exemplaryId, userId }: RentalsAttributes
  ): Promise<boolean>;

  delete(id: number): Promise<void>;

   /*
    ***about reservation***
   */
    getReservationByExemplaryAndUser(
    exemplaryId: number,
    userId: number
  ): Promise<Reservation>;

  findReservationsByExemplaryAndUser(
    exemplaryId: number,
    userId: number
  ): Promise<Reservation[]>;
}

export { IRentalsRepository, RentalsAttributes, RentalsListParameters };
