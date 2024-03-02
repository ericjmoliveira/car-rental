import { ReactNode } from 'react';

export function Content({ children }: { children: ReactNode }) {
  return <main className="min-h-screen p-4 md:p-8">{children}</main>;
}
