import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  measurements: any;
  recommendations: any[];
}

const emailSchema = z.string().email("Please enter a valid email address");

const EmailModal = ({ isOpen, onClose, measurements, recommendations }: EmailModalProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    try {
      emailSchema.parse(email);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Invalid Email",
          description: error.errors[0].message,
          variant: "destructive",
        });
        return;
      }
    }

    setLoading(true);

    try {
      const { error } = await supabase.functions.invoke("send-size-report", {
        body: {
          email,
          measurements,
          recommendations,
        },
      });

      if (error) throw error;

      setSuccess(true);
      toast({
        title: "Email Sent!",
        description: "Check your inbox for your personalized size guide.",
      });

      setTimeout(() => {
        onClose();
        setSuccess(false);
        setEmail("");
      }, 3000);
    } catch (error: any) {
      toast({
        title: "Failed to Send Email",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        {success ? (
          <div className="text-center py-8">
            <div className="mb-6 flex justify-center">
              <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-full">
                <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Email Sent Successfully!</h2>
            <p className="text-muted-foreground">
              Check your inbox for your personalized size guide
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
              </div>
              <DialogTitle className="text-center text-2xl">
                📧 Email Your Size Guide
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSendEmail} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <h3 className="font-semibold text-sm">📋 What you'll receive:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>✓ Your complete measurements</li>
                  <li>✓ Size recommendations for {recommendations.length} brands</li>
                  <li>✓ Price ranges for each category</li>
                  <li>✓ Shopping tips and advice</li>
                </ul>
              </div>

              <div className="bg-accent/10 border-l-4 border-accent p-4 rounded">
                <p className="text-sm">
                  🔒 <strong>Privacy Guarantee:</strong> We respect your privacy. 
                  Your email will only be used to send this report. No spam, ever.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 gradient-primary"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Report"}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EmailModal;
