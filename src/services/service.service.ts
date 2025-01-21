import api from './api';

export interface Service {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  sale_price: number | null;
  discount_percent: number;
  thumbnail: string;
  category_id: number;
  estimated_time?: string;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
}

const serviceService = {
  getService: async (slug: string): Promise<Service> => {
    const response = await api.get(`/services/${slug}`);
    return response.data.data;
  },

  getRelatedServices: async (categoryId: number, currentServiceId: number): Promise<Service[]> => {
    const response = await api.get(`/services`, {
      params: {
        category_id: categoryId,
        exclude_id: currentServiceId,
        limit: 4
      }
    });
    return response.data.data;
  }
};

export default serviceService; 