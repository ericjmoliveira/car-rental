'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { CarFront, BookText } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import { SignInButton } from './sign-in-button';
import { SignOutButton } from './sign-out-button';

export function Header() {
  const { data, status } = useSession();

  return (
    <header className="flex w-full items-center justify-between bg-slate-900 p-4 text-white">
      <div className="flex items-center justify-between gap-2">
        <CarFront size={25} />
        <h1 className="text-lg font-semibold">Rent-A-Car</h1>
      </div>
      {status === 'authenticated' ? (
        <Popover>
          <PopoverTrigger>
            <Button className="text-md flex items-center gap-2 font-semibold">
              <Avatar className="h-8 w-8">
                <AvatarImage src={data.user?.image!} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <span>{data.user.name}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <Button variant="link" className="flex items-center gap-2">
              <BookText size={25} />
              <Link href={'/reservations'}>View reservations</Link>
            </Button>
            <SignOutButton />
          </PopoverContent>
        </Popover>
      ) : (
        <SignInButton />
      )}
    </header>
  );
}
