import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authAPI } from "@/services/auth-api.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Ruler } from "lucide-react";
import { z } from "zod";

interface LocationState {
  from?: string;
}

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters");

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      if (authAPI.isAuthenticated()) {
        try {
          await authAPI.getMe();
          const from = (location.state as LocationState)?.from || "/";
          navigate(from);
        } catch (error) {
          // Token invalid, stay on auth page
        }
      }
    };

    checkAuth();
  }, [navigate, location]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    try {
      emailSchema.parse(email);
      passwordSchema.parse(password);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
        return;
      }
    }

    setLoading(true);

    try {
      // Use Backend API
      if (isLogin) {
        await authAPI.login(email, password);
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
        // Dispatch custom event to update Header
        window.dispatchEvent(new Event("authStateChange"));
        const from = (location.state as LocationState)?.from || "/";
        navigate(from);
      } else {
        await authAPI.register(email, password);
        toast({
          title: "Account Created!",
          description:
            "Welcome to FitFinder Pro. You can now start your measurements.",
        });
        // Dispatch custom event to update Header
        window.dispatchEvent(new Event("authStateChange"));
        const from = (location.state as LocationState)?.from || "/";
        navigate(from);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      // style={{
      //   backgroundImage: `url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920')`,
      // }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-background/95 backdrop-blur-sm rounded-2xl shadow-elegant p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Ruler className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isLogin ? "Welcome Back" : "Join FitFinder Pro"}
            </h1>
            <p className="text-muted-foreground text-center">
              {isLogin
                ? "Login to access your personalized measurements"
                : "Create an account to get started"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background"
              />
            </div>

            <Button
              type="submit"
              className="w-full gradient-primary"
              disabled={loading}
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Login"}
            </button>
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              🔒{" "}
              {isLogin
                ? "Measurement features require login"
                : "Your data is secure"}
              <br />
              📖 Browse our guide as a guest
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
