
import { BMWModel, Notification } from './types';

export const MOCK_MODELS: BMWModel[] = [
  // CARS
  {
    id: 'm3-comp-2024',
    name: 'M3 Competition Sedan',
    type: 'Car',
    series: 'M Series',
    basePrice: 13100000,
    colors: ['Isle of Man Green', 'Brooklyn Grey', 'Toronto Red', 'Black Sapphire'],
    specs: {
      engine: '3.0L M TwinPower Turbo inline 6-cylinder',
      horsepower: 503,
      torque: 479,
      topSpeed: 290,
      acceleration: 3.8,
      fuelType: 'Petrol',
      year: 2024
    },
    popularity: 98,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1000&auto=format&fit=crop',
    interiorImage: 'https://images.unsplash.com/photo-1619330091138-04ca211f00b4?q=80&w=1000&auto=format&fit=crop',
    description: 'The BMW M3 Competition Sedan sets the standard for high-performance four-door luxury.',
    isNew: true
  },
  {
    id: 'i7-xdrive60-2024',
    name: 'i7 xDrive60',
    type: 'Car',
    series: 'i Series',
    basePrice: 21300000,
    colors: ['Carbon Black', 'Mineral White', 'Oxide Grey', 'Tanzanite Blue'],
    specs: {
      engine: 'Dual electric motors',
      horsepower: 536,
      torque: 549,
      topSpeed: 240,
      acceleration: 4.5,
      fuelType: 'Electric',
      year: 2024
    },
    popularity: 92,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1000&auto=format&fit=crop',
    interiorImage: 'https://images.unsplash.com/photo-1621932953986-15fcfec83199?q=80&w=1000&auto=format&fit=crop',
    description: 'The all-electric BMW i7 is the ultimate luxury sedan, combining electric performance with multisensory entertainment.',
    isNew: false
  },
  // BIKES (MOTORRAD)
  {
    id: 'm1000rr-2024',
    name: 'M 1000 RR',
    type: 'Bike',
    series: 'M Series',
    basePrice: 4900000,
    colors: ['Light White', 'Racing Blue Metallic', 'Racing Red'],
    specs: {
      engine: '999cc Water/oil-cooled 4-cylinder engine',
      horsepower: 212,
      torque: 113,
      topSpeed: 314,
      acceleration: 3.1,
      fuelType: 'Petrol',
      year: 2024
    },
    popularity: 99,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1000&auto=format&fit=crop',
    interiorImage: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=1000&auto=format&fit=crop',
    description: 'Born on the racetrack. The BMW M 1000 RR is the ultimate Superbike for the highest demands of performance.',
    isNew: true
  },
  {
    id: 'r1300gs-2024',
    name: 'R 1300 GS',
    type: 'Bike',
    series: 'X Series',
    basePrice: 2095000,
    colors: ['Racing Blue', 'Black Storm', 'Aurelius Green'],
    specs: {
      engine: '1,300cc Boxer engine',
      horsepower: 145,
      torque: 149,
      topSpeed: 225,
      acceleration: 3.3,
      fuelType: 'Petrol',
      year: 2024
    },
    popularity: 94,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=1000&auto=format&fit=crop',
    interiorImage: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1000&auto=format&fit=crop',
    description: 'The pioneer of adventure bikes. The R 1300 GS is lighter, more powerful, and more compact.',
    isNew: true
  },
  {
    id: 's1000rr-2024',
    name: 'S 1000 RR',
    type: 'Bike',
    series: 'M Series',
    basePrice: 2075000,
    colors: ['Blackstorm Metallic', 'Passion Red', 'Light White'],
    specs: {
      engine: '999cc inline 4-cylinder',
      horsepower: 210,
      torque: 113,
      topSpeed: 303,
      acceleration: 3.2,
      fuelType: 'Petrol',
      year: 2024
    },
    popularity: 97,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1621259182978-fbf9ad132d84?q=80&w=1000&auto=format&fit=crop',
    interiorImage: 'https://images.unsplash.com/photo-1449495169669-7b118f960237?q=80&w=1000&auto=format&fit=crop',
    description: 'Uncompromisingly designed for performance. The S 1000 RR is the icon of super sport bikes.',
    isNew: false
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'New Model Alert!',
    message: 'The all-new BMW M5 has just been announced for India. Bookings open soon!',
    date: '2024-05-20',
    isRead: false
  },
  {
    id: '2',
    title: 'Motorrad Update',
    message: 'The M 1000 RR is now available for viewing at select Indian dealerships.',
    date: '2024-05-18',
    isRead: true
  }
];

export const SERIES_LIST = ['M Series', 'i Series', '3 Series', '5 Series', '7 Series', 'X Series', 'Motorrad'];
