import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authAPI } from "@/services/auth-api.service";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user has valid access token
        if (authAPI.isAuthenticated()) {
          // Verify token is still valid by calling /me endpoint
          await authAPI.getMe();
          setIsAuthenticated(true);
          // Dispatch event to update Header
          window.dispatchEvent(new Event('authStateChange'));
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        // Token invalid or expired, try to refresh
        try {
          await authAPI.refreshAccessToken();
          setIsAuthenticated(true);
          // Dispatch event to update Header
          window.dispatchEvent(new Event('authStateChange'));
        } catch (refreshError) {
          setIsAuthenticated(false);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
