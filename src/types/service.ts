export interface RepairCategory {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description?: string;
  is_active: boolean;
  sort_order: number;
  services?: RepairService[];
}

export interface RepairService {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description?: string;
  base_price: number;
  price_note?: string;
  service_details?: string;
  image?: string;
  is_active: boolean;
  sort_order: number;
  category?: RepairCategory;
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