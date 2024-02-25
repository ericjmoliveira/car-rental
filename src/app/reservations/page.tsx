import { getAuthenticatedUser } from '@/lib/auth';
import { fetchUserReservations } from '@/lib/data';
import { permanentRedirect } from 'next/navigation';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

import Image from 'next/image';

import { CancelReservation } from '@/components/cancel-reservation';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

// /reservations
export default async function Page() {
  const authenticatedUser = await getAuthenticatedUser();

  if (!authenticatedUser) {
    permanentRedirect('/');
  }

  const userReservations = await fetchUserReservations(authenticatedUser.id);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Reservations List</h2>
      {userReservations?.length === 0 ? (
        <p>You have no reservations.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {userReservations?.map((reservation) => (
            <Card key={reservation.id}>
              <CardHeader>
                <CardTitle>{`${reservation.class?.name}`}</CardTitle>
                <CardDescription>{reservation.class?.carExample} or similar</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src={reservation.class?.carExampleImage!}
                  width={250}
                  height={250}
                  alt={reservation.class?.carExample!}
                  className="mx-auto h-auto w-auto"
                  priority
                />
                <section className="mb-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Reservation Date</h4>
                    <p>{format(reservation.reservationDate, 'PPP')}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Pick-up Location</h4>
                    <p>{reservation.location?.name}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Pick-up Date</h4>
                    <p>{format(reservation.pickupDate, 'PPP')}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Return Date</h4>
                    <p>{format(reservation.returnDate, 'PPP')}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Young Renter</h4>
                    <p>{reservation.isYoungRenter ? 'Yes' : 'No'}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Total Price</h4>
                    <p>${reservation.totalPrice}</p>
                  </div>
                </section>
              </CardContent>
              <CardFooter>
                <AlertDialog>
                  <AlertDialogTrigger className="w-full" asChild>
                    <Button variant="destructive" className="w-full">
                      Cancel reservation
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-11/12 rounded-md">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Your reservation will be canceled. This is a destructive action.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <CancelReservation id={reservation.id} />
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
