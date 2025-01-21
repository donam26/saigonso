import api from './api';

export interface BookingFormData {
    service_id?: number;
    customer_name: string;
    phone_number: string;
    booking_date: string;
    booking_time: string;
    device_type: string;
    device_model: string;
    problem_description: string;
    note?: string;
}

export interface DeviceType {
    id: string;
    name: string;
    icon: string;
    description: string;
}

export interface BookingResponse {
    id: number;
    customer_id: number;
    service_id: number | null;
    booking_date: string;
    booking_time: string;
    device_type: string;
    device_model: string;
    problem_description: string;
    note?: string;
    price: number;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    created_at: string;
    updated_at: string;
    service?: {
        id: number;
        name: string;
        description: string;
        price: number;
    };
    customer?: {
        id: number;
        name: string;
        phone: string;
    };
}

class BookingService {
    async createBooking(data: BookingFormData): Promise<BookingResponse> {
        const response = await api.post('/bookings', data);
        return response.data.data;
    }

    async getBooking(id: number): Promise<BookingResponse> {
        const response = await api.get(`/bookings/${id}`);
        return response.data.data;
    }

    async cancelBooking(id: number): Promise<BookingResponse> {
        const response = await api.post(`/bookings/${id}/cancel`);
        return response.data.data;
    }

    async getAvailableTimeSlots(date: string): Promise<Record<string, string[]>> {
        const response = await api.get('/bookings/available-times', {
            params: { date }
        });
        return response.data.data;
    }

    async getDeviceTypes(): Promise<DeviceType[]> {
        const response = await api.get('/device-types');
        return response.data.data;
    }

    async getCommonProblems(deviceType: string): Promise<string[]> {
        const response = await api.get(`/device-types/${deviceType}/problems`);
        return response.data.data;
    }
}

export const bookingService = new BookingService(); 