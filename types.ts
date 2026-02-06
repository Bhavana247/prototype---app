
export interface CarSpec {
  engine: string;
  horsepower: number;
  torque: number;
  topSpeed: number; // in km/h
  acceleration: number; // 0-100 km/h in seconds
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  year: number;
}

export type ModelType = 'Car' | 'Bike';

export interface BMWModel {
  id: string;
  name: string;
  type: ModelType;
  series: string;
  basePrice: number; // in INR
  colors: string[];
  specs: CarSpec;
  popularity: number; // 1-100
  rating: number; // 1-5
  image: string;
  interiorImage: string;
  description: string;
  isNew: boolean;
}

export interface FilterState {
  searchQuery: string;
  maxPrice: number;
  minSpeed: number;
  series: string[];
  years: number[];
  types: ModelType[];
  sortBy: 'price-asc' | 'price-desc' | 'popularity' | 'rating' | 'speed';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  modelId?: string;
}
