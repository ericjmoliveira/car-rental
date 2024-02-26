import { CarClassesList } from '@/components/car-classes-list';
import { fetchCarClassById, fetchCarClasses, fetchLocations } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { ReservationForm } from '@/components/reservation-form';

// /cars/[id]
export default async function Page({ params }: { params: { id: string } }) {
  const carClass = await fetchCarClassById(params.id);
  const carClasses = await fetchCarClasses();
  const locations = await fetchLocations();

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">{carClass?.name} Class</h2>
      <p className="mb-4">{carClass?.description}</p>
      <img
        src={carClass?.carExampleImage}
        alt={carClass?.carExample}
        className="mx-auto h-auto w-80"
      />
      <h3 className="mb-4 text-xl font-semibold">{carClass?.carExample} or similar</h3>
      <Separator />
      <div>
        <p className="my-4 font-semibold uppercase">Details</p>
        <ul className="mb-8 flex list-inside list-disc items-center gap-8 font-medium">
          {carClass?.details.map((detail) => <li key={detail}>{detail}</li>)}
        </ul>
      </div>
      <div>
        <p className="my-4 font-semibold uppercase">Features</p>
        <ul className="mb-8 list-inside list-disc items-center font-medium">
          {carClass?.features.map((detail) => <li key={detail}>{detail}</li>)}
        </ul>
      </div>
      <ReservationForm locations={locations} carClasses={carClasses} />
      <h3 className="my-8 text-2xl font-semibold">Explore Similar Vehicle Classes</h3>
      <CarClassesList carClasses={carClasses?.filter((carClass) => carClass.id !== params.id)} />
    </div>
  );
}
