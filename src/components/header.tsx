import { CarFront, CircleUserRound } from 'lucide-react';

export function Header() {
  return (
    <header className="flex w-full items-center justify-between bg-black p-4 text-white">
      <div className="flex items-center justify-between gap-2">
        <CarFront size={25} />
        <h1 className="text-lg font-semibold">Rent-A-Car</h1>
      </div>
      <div className="flex items-center justify-between gap-2">
        <CircleUserRound size={25} />
        <span className="font-semibold">John Doe</span>
      </div>
    </header>
  );
}
