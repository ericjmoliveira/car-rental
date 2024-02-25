'use client';

import { deleteReservation } from '@/lib/actions';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

export function CancelReservation({ id }: { id: string }) {
  const { toast } = useToast();
  const router = useRouter();

  const handleCancelReservation = async () => {
    await deleteReservation(id);

    toast({
      title: 'Reservation successfully canceled!',
      description: 'You can start another reservation anytime.'
    });
    router.push('/');
  };

  return (
    <Button variant="destructive" onClick={handleCancelReservation}>
      Continue
    </Button>
  );
}
