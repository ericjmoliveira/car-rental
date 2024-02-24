'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { add, format, sub } from 'date-fns';
import { Class, Location } from '@prisma/client';
import { CalendarIcon } from '@radix-ui/react-icons';

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
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Switch } from './ui/switch';
import { cn } from '@/lib/utils';

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

  function onSubmit(values: z.infer<typeof reservationFormSchema>) {
    console.log(values);
  }

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Reserve a Vehicle</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                          'w-[240px] pl-3 text-left font-normal',
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
                          'w-[240px] pl-3 text-left font-normal',
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
                        {carClass.name} - ${carClass.pricePerDay}/day
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
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
