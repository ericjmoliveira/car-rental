'use server';

interface ReservationData {
  pickUpLocation: string;
  pickUpDate: Date;
  returnDate: Date;
  carClass: string;
  youngRenter: boolean;
}

export async function createReservation(data: ReservationData) {
  console.log(data);
}
