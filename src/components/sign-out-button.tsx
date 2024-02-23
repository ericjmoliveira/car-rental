'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

import { Button } from './ui/button';

export function SignOutButton() {
  return (
    <Button variant="ghost" onClick={() => signOut()} className="flex items-center gap-2">
      <LogOut />
      Sign out
    </Button>
  );
}
