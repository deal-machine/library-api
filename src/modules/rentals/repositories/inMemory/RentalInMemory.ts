import { RentalsAttributes } from '../IRentalsRepository';

export class RentalInMemory implements RentalsAttributes {
    id?: number
    employeeId: number;
    exemplaryId: number;
    userId: number;
    rentalDate?: Date;
    expectedReturnDate?: Date;
    returnDate?: Date;
    penalty?: number;

    constructor(){
        if (!this.id) this.id = Math.floor(Math.random() * 10) + 1;
    }
}