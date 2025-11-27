import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Ruler, LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { authAPI } from "@/services/auth-api.service";

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    
    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for auth changes within the same tab
    const handleAuthChange = () => {
      checkAuth();
    };
    
    window.addEventListener('authStateChange', handleAuthChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authStateChange', handleAuthChange);
    };
  }, []);

  const checkAuth = async () => {
    try {
      if (authAPI.isAuthenticated()) {
        const response = await authAPI.getMe();
        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
      navigate("/");
      toast({
        title: "Logged out",
        description: "You've been successfully logged out.",
      });
      // Dispatch custom event for other components
      window.dispatchEvent(new Event('authStateChange'));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <Ruler className="w-7 h-7" />
            <span>FitFinder</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/guide" className="text-foreground hover:text-primary transition-colors">
              Guide
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/faq" className="text-foreground hover:text-primary transition-colors">
              FAQ
            </Link>
            
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {user.email?.split('@')[0]}
                </span>
                <Link to="/measurements">
                  <Button className="gradient-primary">My Measurements</Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/auth">
                  <Button className="gradient-primary">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            {user ? (
              <Button size="sm" onClick={handleLogout} variant="outline">
                <LogOut className="w-4 h-4" />
              </Button>
            ) : (
              <Link to="/auth">
                <Button size="sm" variant="outline">Login</Button>
              </Link>
            )}
            <Link to="/measurements">
              <Button size="sm" className="gradient-primary">Start</Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
