import { ReservationAttributes } from "../IReservationsRepository";


export class ReservationInMemory implements ReservationAttributes{
    id?: number;    
    employeeId: number;
    exemplaryId: number;
    userId: number;
    rentalId?: number;
    startDate: Date;
    endDate: Date;

    constructor(){
        if(!this.id) this.id = Math.floor(Math.random() * 10) + 1;
    }
}