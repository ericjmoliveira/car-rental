import { Class } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

interface CarClassesListProps {
  carClasses?: Class[];
}

export function CarClassesList({ carClasses }: CarClassesListProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {carClasses?.map((carClass) => (
        <Card key={carClass.id}>
          <CardHeader>
            <CardTitle>{carClass.name}</CardTitle>
            <CardDescription>{carClass.carExample} or similar</CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              src={carClass.carExampleImage}
              width={250}
              height={250}
              alt={carClass.carExample}
              className="mx-auto h-auto w-auto"
              priority
            />
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
