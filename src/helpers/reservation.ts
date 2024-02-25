import { differenceInDays } from 'date-fns';

interface ReservationData {
  pickupDate: Date;
  returnDate: Date;
  pricePerDay: number;
}

export function calculateReservationTotalPrice({
  pickupDate,
  returnDate,
  pricePerDay
}: ReservationData) {
  const rentDaysAmount = differenceInDays(returnDate, pickupDate);
  const rentTotalPrice = rentDaysAmount * pricePerDay;

  return {
    rentTotalPrice
  };
}
