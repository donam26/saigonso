import api from './api';
import { RepairCategory, RepairService } from '@/types/service';

class RepairServiceClass {
    async getCategories(): Promise<RepairCategory[]> {
        const response = await api.get('/categories');
        return response.data.data;
    }

    async getCategory(slug: string): Promise<RepairCategory> {
        const response = await api.get(`/categories/${slug}`);
        return response.data.data;
    }

    async getServices(params?: { category_id?: number; is_sale?: boolean }): Promise<RepairService[]> {
        const response = await api.get('/services', { params });
        return response.data.data;
    }

    async getService(slug: string): Promise<RepairService> {
        const response = await api.get(`/services/${slug}`);
        return response.data.data;
    }
}

export default new RepairServiceClass(); 