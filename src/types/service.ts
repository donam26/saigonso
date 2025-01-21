export interface RepairCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  icon: string;
  parent_id: number | null;
  children?: RepairCategory[];
}

export interface RepairService {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  sale_price: number | null;
  discount_percent: number | null;
  thumbnail: string;
  category_id: number;
  category: RepairCategory;
}

export interface BookingForm {
  customer_name: string;
  phone: string;
  email?: string;
  service_id: number;
  device_type: string;
  device_model: string;
  problem_description: string;
  preferred_time?: string;
  address?: string;
  note?: string;
} 