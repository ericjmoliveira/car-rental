'use server';

import { calculateReservationTotalPrice } from '@/helpers/reservation';
import { revalidatePath } from 'next/cache';
import { getAuthenticatedUser } from './auth';
import { fetchCarClassById, fetchLocationById } from './data';
import { prisma } from './prisma';

interface ReservationData {
  pickUpLocation: string;
  pickUpDate: Date;
  returnDate: Date;
  carClass: string;
  youngRenter: boolean;
}

export async function createReservation(data: ReservationData) {
  const user = await getAuthenticatedUser();
  const location = await fetchLocationById(data.pickUpLocation);
  const carClass = await fetchCarClassById(data.carClass);

  if (!user || !location || !carClass) return;

  try {
    const { rentTotalPrice } = calculateReservationTotalPrice({
      pickupDate: data.pickUpDate,
      returnDate: data.returnDate,
      pricePerDay: carClass?.pricePerDay
    });

    const reservationData = {
      userId: user?.id,
      locationId: location?.id,
      pickupDate: new Date(data.pickUpDate),
      returnDate: new Date(data.returnDate),
      classId: carClass?.id,
      isYoungRenter: data.youngRenter,
      totalPrice: data.youngRenter ? rentTotalPrice + 25 : rentTotalPrice
    };

    await prisma.reservation.create({ data: reservationData });

    revalidatePath('/reservations');
  } catch (error) {
    return {
      message: 'An internal error occurred, try again later'
    };
  }
}

export async function deleteReservation(id: string) {
  const user = await getAuthenticatedUser();

  if (!user) return;

  await prisma.reservation.delete({ where: { id } });

  revalidatePath('/reservations');
}
