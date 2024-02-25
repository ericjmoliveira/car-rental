import { ReactNode } from 'react';

export function Content({ children }: { children: ReactNode }) {
  return <main className="p-4 md:p-8">{children}</main>;
}
