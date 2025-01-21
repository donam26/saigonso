import { CategoryContent } from '@/components/categories/CategoryContent';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    return {
      title: `Danh mục ${resolvedParams.slug} - FastCare`,
      description: `Xem các dịch vụ trong danh mục ${resolvedParams.slug} tại FastCare`,
    };
  } catch {
    return {
      title: 'Danh mục - FastCare',
      description: 'Xem các dịch vụ theo danh mục tại FastCare',
    };
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <CategoryContent slug={resolvedParams.slug} />;
} 