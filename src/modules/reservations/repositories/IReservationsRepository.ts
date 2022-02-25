import { Reservation } from "@shared/infra/sequelize/models";

interface ReservationAttributes {
  employeeId: number;
  exemplaryId: number;
  userId: number;
  rentalId?: number;
  startDate: Date;
  endDate: Date;
}

interface IReservationsRepository {
  list(
    employeeId: number,
    exemplaryId: number,
    userId: number,
    rentalId: number,
    startDate: Date | undefined,
    endDate: Date | undefined,
    createdStartDate: Date | undefined,
    createdEndDate: Date | undefined
  ): Promise<Reservation[]>;
  findById(id: number): Promise<Reservation>;
  findAndCountReservationsByExemplary(id: number): Promise<Number>;

  findByDatesAndExemplary({
    exemplaryId: number,
    startDate,
    endDate,
  }): Promise<Reservation[]>;

  findByBookAndUser({
    bookId,
    userId,
    startDate,
    endDate,
  }): Promise<Reservation>;

  create(reservation: ReservationAttributes): Promise<Reservation>;

  delete(id: number): Promise<void>;

  update(
    reservation: Reservation,
    {
      employeeId,
      exemplaryId,
      userId,
      startDate,
      endDate,
    }: ReservationAttributes
  ): Promise<boolean>;
}

export { IReservationsRepository, ReservationAttributes };
