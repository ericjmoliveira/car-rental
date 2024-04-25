import { Class } from '@prisma/client';
import Link from 'next/link';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

interface CarClassesListProps {
  carClasses?: Class[];
}

export function CarClassesList({ carClasses }: CarClassesListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
      {carClasses?.map((carClass) => (
        <Card key={carClass.id}>
          <CardHeader>
            <CardTitle>{carClass.name}</CardTitle>
            <CardDescription>{carClass.carExample} or similar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mx-auto h-80 w-80">
              <img
                src={carClass.carExampleImage}
                alt={carClass.carExample}
                className="object-cover"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/cars/${carClass.id}`} className="w-full">
              <Button className="w-full">View details</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
