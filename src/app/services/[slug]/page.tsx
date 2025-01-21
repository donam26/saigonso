import { Metadata } from 'next';
import { ServiceDetail } from '@/components/services/ServiceDetail';
import serviceService from '@/services/service.service';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const service = await serviceService.getService(resolvedParams.slug);
    return {
      title: `${service.name} - FastCare`,
      description: service.description,
    };
  } catch {
    return {
      title: 'Chi tiết dịch vụ - FastCare',
      description: 'Thông tin chi tiết dịch vụ sửa chữa tại FastCare',
    };
  }
}

export default async function ServicePage({ params }: PageProps) {
  const resolvedParams = await params;
  return (
    <div className="container mx-auto px-4 py-6">
      <ServiceDetail slug={resolvedParams.slug} />
    </div>
  );
} 