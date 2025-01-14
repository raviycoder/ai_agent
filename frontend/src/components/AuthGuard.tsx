import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useFetchData from "@/hooks/useFetchData";

interface AuthGuardProps {
  children: React.ReactNode;
  redirectPath?: string; // Default path to redirect if not logged in
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, redirectPath = "/auth/login" }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { error } = useFetchData(`/api/auth/user`) as unknown as { error: { status: number } };
  const router = useRouter();


  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");

      if (token && error?.status !== 401) {
        // Optionally validate token or decode it
        setIsAuthenticated(true); // Assume valid token for simplicity
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [error?.status]);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push(redirectPath); // Redirect if not authenticated
    }
  }, [isAuthenticated, redirectPath, router]);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // Render children if authenticated
  return <>{isAuthenticated && children}</>;
};

export default AuthGuard;