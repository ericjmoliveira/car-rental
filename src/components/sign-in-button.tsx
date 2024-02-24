'use client';

import { signIn } from 'next-auth/react';
import { LogIn } from 'lucide-react';

import { Button } from './ui/button';

export function SignInButton() {
  return (
    <Button
      variant="outline"
      onClick={() => signIn()}
      className="flex items-center gap-2 bg-transparent"
    >
      <LogIn />
      Sign in
    </Button>
  );
}
