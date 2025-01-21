import { Metadata } from 'next';
import { ServiceDetail } from '@/components/services/ServiceDetail';
import serviceService from '@/services/service.service';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const service = await serviceService.getService(params.slug);
    return {
      title: `${service.name} - FastCare`,
      description: service.description,
    };
  } catch (error) {
    return {
      title: 'Chi tiết dịch vụ - FastCare',
      description: 'Thông tin chi tiết dịch vụ sửa chữa tại FastCare',
    };
  }
}

export default async function ServicePage({ params }: Props) {
  return (
    <div className="container mx-auto px-4 py-6">
      <ServiceDetail slug={params.slug} />
    </div>
  );
} 