import { prisma } from './prisma';

export async function fetchCarClasses() {
  try {
    const carClasses = await prisma.class.findMany();

    return carClasses;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCarClassById(id: string) {
  try {
    const carClasses = await prisma.class.findUnique({ where: { id } });

    return carClasses;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchLocations() {
  try {
    const locations = await prisma.location.findMany();

    return locations;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchLocationById(id: string) {
  try {
    const locations = await prisma.location.findUnique({ where: { id } });

    return locations;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUserReservations(userId: string) {
  try {
    const userReservations = await prisma.reservation.findMany({
      where: { userId },
      select: {
        location: true,
        class: true,
        id: true,
        pickupDate: true,
        returnDate: true,
        isYoungRenter: true,
        totalPrice: true,
        reservationDate: true
      },
      orderBy: { reservationDate: 'desc' }
    });

    return userReservations;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchReservationById(id: string) {
  try {
    const reservation = await prisma.reservation.findUnique({ where: { id } });

    return reservation;
  } catch (error) {
    console.log(error);
  }
}
