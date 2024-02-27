import { fetchCarClasses, fetchLocations } from '@/lib/data';

import { CarClassesList } from '@/components/car-classes-list';
import { ReservationForm } from '@/components/reservation-form';

export const metadata = {
  title: 'Rent-a-Car | Home'
};

export default async function Page() {
  const locations = await fetchLocations();
  const carClasses = await fetchCarClasses();

  return (
    <section>
      <ReservationForm locations={locations} carClasses={carClasses} />
      <h2 className="my-8 text-2xl font-semibold">Meet the Fleet</h2>
      <p className="mb-8">
        Choose from a variety of rental cars in this category including economy, full-size or luxury
        sedans. Whether you are looking for fuel-efficiency, space, or comfort and style you are
        sure to find the perfect rental car no matter whether you are going on a quick family visit
        or an adventurous road trip.
      </p>
      <CarClassesList carClasses={carClasses} />
    </section>
  );
}
