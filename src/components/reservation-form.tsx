'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Class, Location } from '@prisma/client';
import { CalendarIcon } from '@radix-ui/react-icons';
import { add, format, sub } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import { calculateReservationTotalPrice } from '@/helpers/reservation';
import { createReservation } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { DialogClose } from '@radix-ui/react-dialog';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Switch } from './ui/switch';
import { useToast } from './ui/use-toast';

const reservationFormSchema = z.object({
  pickUpLocation: z.string().min(1, { message: 'The pick-up location is required.' }),
  pickUpDate: z.date(),
  returnDate: z.date(),
  youngRenter: z.boolean(),
  carClass: z.string().min(1, { message: 'The car class is required.' })
});

interface ReservationFormProps {
  locations?: Location[];
  carClasses?: Class[];
}

export function ReservationForm({ locations, carClasses }: ReservationFormProps) {
  const form = useForm<z.infer<typeof reservationFormSchema>>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      pickUpLocation: '',
      pickUpDate: new Date(),
      returnDate: add(new Date(), { days: 1 }),
      youngRenter: false,
      carClass: ''
    }
  });

  const { status } = useSession();
  const { toast } = useToast();
  const reservationData = {
    pickupDate: form.watch('pickUpDate'),
    returnDate: form.watch('returnDate'),
    pricePerDay: carClasses?.find((carClass) => carClass.id === form.watch('carClass'))
      ?.pricePerDay!
  };
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof reservationFormSchema>) {
    const response = await createReservation(data);

    if (response?.message) {
      return toast({ title: response.message, variant: 'destructive' });
    }

    router.push('/reservations');
    toast({
      title: 'Reservation successfully created!',
      description: 'Head to any of our units in the location chosen to pick up the car.'
    });
  }

  return (
    <div className="mx-auto md:w-1/2">
      <h2 className="mb-4 text-2xl font-semibold">Reserve a Vehicle</h2>
      <p className="mb-4">
        Unlock the freedom to explore with our extensive range of rental vehicles. Whether you are
        planning a weekend getaway, a business trip, or simply need a reliable ride for your daily
        commute, we have got you covered. At Rent-a-Car, we believe in making your journey seamless
        and enjoyable from start to finish.
      </p>
      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="pickUpLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pick-up Location</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} required>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Provide a location..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {locations?.map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pickUpDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Pick-up Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Provide the pick-up date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < sub(new Date(), { days: 1 })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="returnDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Return Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Provide the return date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < sub(new Date(), { days: 1 }) || date < form.getValues('pickUpDate')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="carClass"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Car Class</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Provide a car class..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {carClasses?.map((carClass) => (
                      <SelectItem key={carClass.id} value={carClass.id}>
                        {carClass.name} ({carClass.carExample} or similar)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="youngRenter"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Young Renter?</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Dialog>
        {status === 'unauthenticated' ? (
          <Button onClick={() => signIn('google')} className="mt-8 w-full">
            Sign in to continue
          </Button>
        ) : (
          <DialogTrigger asChild>
            <Button className="mt-8 w-full" disabled={!form.formState.isValid}>
              Continue
            </Button>
          </DialogTrigger>
        )}
        <DialogContent className="w-11/12 rounded-md">
          <DialogHeader>
            <DialogTitle className="mb-2 text-xl font-semibold">
              Review Reservation Details
            </DialogTitle>
            <section className="flex flex-col gap-2">
              <div>
                <h4 className="font-medium">Pick-up Location</h4>
                <p>
                  {form.watch('pickUpLocation') !== '' &&
                    locations?.find((location) => location.id === form.getValues().pickUpLocation)
                      ?.name}
                </p>
              </div>
              <div>
                <h4 className="font-medium">Pick-up Date</h4>
                <p>{format(form.watch('pickUpDate'), 'PPP')}</p>
              </div>
              <div>
                <h4 className="font-medium">Return Date</h4>
                <p>{format(form.watch('returnDate'), 'PPP')}</p>
              </div>
              <div>
                <h4 className="font-medium">Car Class</h4>
                <p>
                  {form.watch('carClass') !== '' &&
                    `${carClasses?.find((carClass) => carClass.id === form.getValues().carClass)?.name} (${carClasses?.find((carClass) => carClass.id === form.getValues().carClass)?.carExample} or similar)`}
                </p>
              </div>
              <div>
                <h4 className="font-medium">Young Renter?</h4>
                <p>{form.watch('youngRenter') === true ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <h4 className="my-2 text-xl font-semibold">Pricing Summary</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-fit">Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-left">
                        {form.watch('carClass') !== '' &&
                          `${carClasses?.find((carClass) => carClass.id === form.getValues().carClass)?.name} Class ($${carClasses?.find((carClass) => carClass.id === form.getValues().carClass)?.pricePerDay}/day)`}
                      </TableCell>
                      <TableCell className="text-right">{`$${calculateReservationTotalPrice(reservationData).rentTotalPrice}`}</TableCell>
                    </TableRow>
                    {form.watch('youngRenter') === true ? (
                      <>
                        <TableRow>
                          <TableCell className="text-left">Young Renter Fee (Under 25)</TableCell>
                          <TableCell className="text-right">$25</TableCell>
                        </TableRow>
                        <TableRow className="text-lg font-medium">
                          <TableCell className="text-left">Total</TableCell>
                          <TableCell className="text-right">
                            {`$${calculateReservationTotalPrice(reservationData).rentTotalPrice + 25}`}
                          </TableCell>
                        </TableRow>
                      </>
                    ) : (
                      <TableRow className="text-lg font-medium">
                        <TableCell className="text-left">Total</TableCell>
                        <TableCell className="text-right">
                          {`$${calculateReservationTotalPrice(reservationData).rentTotalPrice}`}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </section>
          </DialogHeader>
          <DialogFooter className="flex gap-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={form.handleSubmit(onSubmit)}>Confirm reservation</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
