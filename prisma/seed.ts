import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.class.createMany({
    data: [
      {
        name: 'Economy',
        description:
          'Rent an economy car for driving in crowded, downtown areas with busy traffic and tight parking spaces. Economy car rentals typically offer the best fuel efficiency.',
        carExample: 'Mitsubishi Mirage',
        carExampleImage:
          'https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/ECAR.doi.768.high.imageSmallThreeQuarterNodePath.png/1492780366644.png',
        details: ['Automatic', '4 People', '2 Bags'],
        features: [
          '2 Wheel Drive',
          'Gasoline Vehicle',
          'AM/FM Stereo Radio',
          'Automatic',
          'Air Conditioning'
        ],
        pricePerDay: 40
      },
      {
        name: 'Compact',
        description:
          'Compact cars offer great gas mileage and the ease of driving and parking in high traffic areas.',
        carExample: 'Nissan Versa',
        carExampleImage:
          'https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/CCAR.doi.768.high.imageSmallThreeQuarterNodePath.png/1611777286679.png',
        details: ['Automatic', '5 People', '2 Bags'],
        features: [
          '2 Wheel Drive',
          'Gasoline Vehicle',
          'Cruise Control',
          'AM/FM Stereo Radio',
          'Automatic',
          'Air Conditioning'
        ],
        pricePerDay: 50
      },
      {
        name: 'Mid Size',
        description:
          'A mid size car provides some more room for passengers and luggage than most smaller cars.',
        carExample: 'Toyota Corolla',
        carExampleImage:
          'https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/ICAR.doi.768.high.imageSmallThreeQuarterNodePath.png/1620230914227.png',
        details: ['Automatic', '5 People', '3 Bags'],
        features: [
          '2 Wheel Drive',
          'Gasoline Vehicle',
          'Bluetooth',
          'Cruise Control',
          'AM/FM Stereo Radio',
          'Automatic',
          'Air Conditioning'
        ],
        pricePerDay: 70
      },
      {
        name: 'Standard',
        description:
          'A standard car is a larger sedan, which provides more room for passengers and can fit an additional bag in the trunk compared to a mid size car. ',
        carExample: 'Volkswagen Jetta',
        carExampleImage:
          'https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/SCAR.doi.768.high.imageSmallThreeQuarterNodePath.png/1544210775124.png',
        details: ['Automatic', '5 People', '3 Bags'],
        features: [
          '2 Wheel Drive',
          'Gasoline Vehicle',
          'Bluetooth',
          'Cruise Control',
          'AM/FM Stereo Radio',
          'Automatic',
          'Air Conditioning'
        ],
        pricePerDay: 80
      },
      {
        name: 'Full Size',
        description:
          'A full size car is helpful when needing more passenger room and luggage space than a smaller car offers.',
        carExample: 'Chevy Malibu',
        carExampleImage:
          'https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/FCAR.doi.768.high.imageSmallThreeQuarterNodePath.png/1701701384161.png',
        details: ['Automatic', '5 People', '4 Bags'],
        features: [
          '2 Wheel Drive',
          'Gasoline Vehicle',
          'Bluetooth',
          'Cruise Control',
          'AM/FM Stereo Radio',
          'Automatic',
          'Air Conditioning'
        ],
        pricePerDay: 100
      },
      {
        name: 'Convertible',
        description:
          'Rent a convertible and enjoy your next trip in style. Whether you are taking a road trip along the Pacific Coast Highway, enjoying a drive in the desert of the Southwest, or exploring New York city, a convertible is the perfect choice.',
        carExample: 'Ford Mustang Convertible',
        carExampleImage:
          'https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/STAR.doi.768.high.imageSmallThreeQuarterNodePath.png/1543605919377.png',
        details: ['Automatic', '4 People', '2 Bags'],
        features: [
          '2 Wheel Drive',
          'Gasoline Vehicle',
          'Bluetooth',
          'Cruise Control',
          'AM/FM Stereo Radio',
          'Automatic',
          'Air Conditioning'
        ],
        pricePerDay: 140
      },
      {
        name: 'Sports Car',
        description:
          'A sports car is a car designed with an emphasis on dynamic performance, such as handling, acceleration, top speed, the thrill of driving, and racing capability.',
        carExample: 'Dodge Challenger',
        carExampleImage:
          'https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/SSAR.doi.768.high.imageSmallThreeQuarterNodePath.png/1574880314547.png',
        details: ['Automatic', '4 People', '2 Bags'],
        features: [
          '2 Wheel Drive',
          'Gasoline Vehicle',
          'Bluetooth',
          'Cruise Control',
          'AM/FM Stereo Radio',
          'Automatic',
          'Air Conditioning'
        ],
        pricePerDay: 150
      },
      {
        name: 'Standard Hybrid',
        description:
          'A standard hybrid car is a larger sedan that uses two or more distinct types of power, such as submarines that use diesel when surfaced and batteries when submerged.',
        carExample: 'Toyota Prius',
        carExampleImage:
          'https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/SCAH.doi.768.high.imageSmallThreeQuarterNodePath.png/1543605920546.png',
        details: ['Automatic', '5 People', '3 Bags'],
        features: [
          '2 Wheel Drive',
          'Hybrid Vehicle',
          'Bluetooth',
          'Cruise Control',
          'AM/FM Stereo Radio',
          'Automatic',
          'Air Conditioning'
        ],
        pricePerDay: 180
      },
      {
        name: 'Full Size Hybrid',
        description:
          'A full size hybrid car is helpful when needing more passenger room and luggage space. It uses two or more distinct types of power, such as submarines that use diesel when surfaced and batteries when submerged',
        carExample: 'Ford Fusion Hybrid',
        carExampleImage:
          'https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/FCAH.doi.768.high.imageSmallThreeQuarterNodePath.png/1492780375254.png',
        details: ['Automatic', '5 People', '3 Bags'],
        features: [
          '2 Wheel Drive',
          'Hybrid Vehicle',
          'Bluetooth',
          'Cruise Control',
          'AM/FM Stereo Radio',
          'Automatic',
          'Air Conditioning'
        ],
        pricePerDay: 200
      },
      {
        name: 'Electric Luxury Sedan',
        description:
          'A luxury elite electric car provides excellent fuel economy without compromising on comfort or style, great for a long road trip.',
        carExample: 'Tesla Model S',
        carExampleImage:
          'https://www.enterprise.com/en/exotic-car-rental/vehicles/electric-luxury-sedan/tesla-model-s/_jcr_content/root/teaser_image.coreimg.png/1667428295398/tesla-model-s-hero-thumbnail-2048x1360.png',
        details: ['Automatic', '4 People', '4 Bags'],
        features: [
          'Electric Vehicle',
          'Bluetooth',
          'Cruise Control',
          'AM/FM Stereo Radio',
          'Automatic',
          'Air Conditioning'
        ],
        pricePerDay: 250
      }
    ]
  });

  await prisma.location.createMany({
    data: [
      { name: 'Albuquerque, NM' },
      { name: 'Atlanta, GA' },
      { name: 'Boston, MA' },
      { name: 'Chicago, IL' },
      { name: 'Dallas, TX' },
      { name: 'Denver, CO' },
      { name: 'Houston, TX' },
      { name: 'Jacksonville, FL' },
      { name: 'Las Vegas, NV' },
      { name: 'Los Angeles, CA' },
      { name: 'Miami, FL' },
      { name: 'New York City, NY' },
      { name: 'Orlando, FL' },
      { name: 'Philadelphia, PA' },
      { name: 'Phoenix, AZ' },
      { name: 'San Antonio, TX' },
      { name: 'San Diego, CA' },
      { name: 'San Francisco, CA' },
      { name: 'Seattle, WA' },
      { name: 'Washington, DC' }
    ]
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
