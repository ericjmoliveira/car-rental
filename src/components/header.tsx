'use client';

import { BookText } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FaCar } from 'react-icons/fa';
import { SignInButton } from './sign-in-button';
import { SignOutButton } from './sign-out-button';
import { Button } from './ui/button';

export function Header() {
  const { data, status } = useSession();

  return (
    <header className="flex w-full items-center justify-between bg-slate-900 p-4 text-white">
      <Link href={'/'}>
        <div className="flex items-center justify-between gap-2">
          <FaCar size={25} />
          <h1 className="text-lg font-semibold">Rent-a-Car</h1>
        </div>
      </Link>
      {status === 'authenticated' ? (
        <Popover>
          <PopoverTrigger>
            <div className="text-md flex items-center gap-2 font-semibold">
              <Avatar className="h-8 w-8">
                <AvatarImage src={data.user?.image!} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <span>{data.user.name}</span>
            </div>
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
