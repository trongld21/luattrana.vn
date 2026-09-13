export interface ServiceItem {
  id: number;
  name: string;
  slug: string;
  category: string;
  summary: string;
  description: string;
  price_range: string;
  image: string;
  is_featured: boolean;
}

export interface ProductItem {
  id: number;
  name: string;
  slug: string;
  category: string;
  brand: string;
  price: number;
  sale_price: number | null;
  stock: number;
  summary: string;
  description: string;
  image: string;
  is_featured: boolean;
}

export interface CarItem {
  id: number;
  title: string;
  slug: string;
  listing_type: 'sale' | 'rent';
  price: number;
  year: number;
  transmission: string;
  fuel_type: string;
  mileage: string;
  color: string;
  location: string;
  image: string;
  summary: string;
  description: string;
  status: string;
}

export interface PostItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  image: string;
  published_at: string;
}

export interface BookingPayload {
  customer_name: string;
  phone: string;
  email?: string;
  license_plate?: string;
  car_model?: string;
  service_id?: number;
  service_name?: string;
  booking_date: string;
  booking_time: string;
  note?: string;
}

export interface RescuePayload {
  customer_name: string;
  phone: string;
  location: string;
  car_model?: string;
  issue_description?: string;
}
