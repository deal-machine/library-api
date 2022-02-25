import { ReservationInMemory } from "@modules/reservations/repositories/inMemory/ReservationInMemory";
import { IRentalsRepository, RentalsAttributes, RentalsListParameters } from "../IRentalsRepository";
import { RentalInMemory } from "./RentalInMemory";


export class RentalsRepositoryInMemory implements IRentalsRepository{
    
    rentals: RentalInMemory[] = [];

    list({ 
        employeeId,
        exemplaryId,
        userId,
        bookId,
        sampleCode,
        rentalStartDate,
        rentalEndDate }: RentalsListParameters): Promise<RentalInMemory[]> {
        throw new Error("Method not implemented.");
    }
    findAndCountRentalsByExemplary(exemplaryId: number): Promise<Number> {
        throw new Error("Method not implemented.");
    }
    findRentalsByExemplaryAndDate(exemplaryId: number): Promise<RentalInMemory[]> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<RentalInMemory> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<RentalInMemory> {
        throw new Error("Method not implemented.");
    }
    create({
        employeeId,
        exemplaryId,
        userId,
        rentalDate,
        expectedReturnDate, }: RentalsAttributes): Promise<RentalInMemory> {
        throw new Error("Method not implemented.");
    }
    createRentalAndUpdateReservation(
        reservation: ReservationInMemory,
        { employeeId, exemplaryId, userId, rentalDate, expectedReturnDate }: RentalsAttributes): Promise<RentalInMemory> {
        throw new Error("Method not implemented.");
    }
    update(rental: RentalInMemory, { employeeId, exemplaryId, userId }: RentalsAttributes): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    /*about reservations*/
    getReservationByExemplaryAndUser(exemplaryId: number, userId: number): Promise<ReservationInMemory> {
        throw new Error("Method not implemented.");
    }

    findReservationsByExemplaryAndUser(exemplaryId: number, userId: number): Promise<ReservationInMemory[]> {
        throw new Error("Method not implemented.");
    }

}