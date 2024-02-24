import { ReservationForm } from '@/components/reservation-form';
import { fetchCarClasses, fetchLocations } from '@/lib/data';

export default async function Page() {
  const locations = await fetchLocations();
  const carClasses = await fetchCarClasses();

  return (
    <section>
      <ReservationForm locations={locations} carClasses={carClasses} />
    </section>
  );
}
