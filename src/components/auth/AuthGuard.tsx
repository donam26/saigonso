import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/auth';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const { isAuthenticated, token } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated && !token) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, token, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}; 