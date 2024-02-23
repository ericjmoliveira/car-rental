'use client';

import { signIn } from 'next-auth/react';
import { LogIn } from 'lucide-react';

import { Button } from './ui/button';

export function SignInButton() {
  return (
    <Button variant="ghost" onClick={() => signIn()} className="flex items-center gap-2">
      <LogIn />
      Sign in
    </Button>
  );
}
