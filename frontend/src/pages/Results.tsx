import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Download, RefreshCw, User, Ruler, DollarSign, Package } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendSizeRecommendations } from "@/services/emailService";
import { generateSizeReportPDF } from "@/services/pdfService";
import { authAPI } from "@/services/auth-api.service";
import { emailApi } from "@/services/email-api.service";

interface Brand {
  id: string;
  name: string;
  logo_url: string;
  category: string;
  size_chart: any;
  price_ranges?: {
    min: number;
    max: number;
    currency: string;
  };
  product_images?: string[];
}

interface Recommendation {
  brandName: string;
  size: string;
  alternative?: string;
  confidence: number;
  category: string;
  priceRange?: {
    min: number;
    max: number;
    currency: string;
  };
  productImages?: string[];
}

const Results = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [measurements, setMeasurements] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    loadResults();
  }, []);

  useEffect(() => {
    // Pre-fill email if available from measurements
    if (measurements?.email) {
      setEmail(measurements.email);
      // Automatically send email if provided in measurement form
      sendEmailAutomatically(measurements.email);
    }
  }, [measurements]);

  const calculateSize = (measurements: any, sizeChart: any): { size: string; alternative?: string; confidence: number } => {
    const { bust, waist, hips } = measurements;
    const sizes = Object.keys(sizeChart);
    
    let bestMatch = { size: "M", score: 0, alternative: undefined as string | undefined };
    
    for (const size of sizes) {
      const chart = sizeChart[size];
      const [bustMin, bustMax] = chart.bust;
      const [waistMin, waistMax] = chart.waist;
      const [hipsMin, hipsMax] = chart.hips;
      
      let score = 0;
      if (bust >= bustMin && bust <= bustMax) score += 33;
      if (waist >= waistMin && waist <= waistMax) score += 33;
      if (hips >= hipsMin && hips <= hipsMax) score += 34;
      
      // Calculate proximity score
      const bustMid = (bustMin + bustMax) / 2;
      const waistMid = (waistMin + waistMax) / 2;
      const hipsMid = (hipsMin + hipsMax) / 2;
      
      const proximity = 100 - (
        Math.abs(bust - bustMid) +
        Math.abs(waist - waistMid) +
        Math.abs(hips - hipsMid)
      ) / 3;
      
      const totalScore = (score + proximity) / 2;
      
      if (totalScore > bestMatch.score) {
        if (bestMatch.size !== "M") {
          bestMatch.alternative = bestMatch.size;
        }
        bestMatch = { size, score: totalScore, alternative: bestMatch.alternative };
      }
    }
    
    return {
      size: bestMatch.size,
      alternative: bestMatch.alternative,
      confidence: Math.min(Math.round(bestMatch.score), 100)
    };
  };

  const loadResults = async () => {
    try {
      const storedData = localStorage.getItem("measurementData");
      if (!storedData) {
        toast.error("No measurement data found");
        navigate("/measurements");
        return;
      }

      const measurementData = JSON.parse(storedData);
      setMeasurements(measurementData);

      // Mock brand data with size charts
      const brands = [
        {
          name: "Zara",
          category: "Casual Wear",
          size_chart: {
            XS: { bust: [78, 82], waist: [60, 64], hips: [86, 90] },
            S: { bust: [82, 86], waist: [64, 68], hips: [90, 94] },
            M: { bust: [86, 90], waist: [68, 72], hips: [94, 98] },
            L: { bust: [90, 96], waist: [72, 78], hips: [98, 104] },
            XL: { bust: [96, 102], waist: [78, 84], hips: [104, 110] }
          },
          price_ranges: { min: 6000, max: 24000, currency: "LKR" },
          product_images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400"]
        },
        {
          name: "H&M",
          category: "Casual Wear",
          size_chart: {
            XS: { bust: [80, 84], waist: [62, 66], hips: [88, 92] },
            S: { bust: [84, 88], waist: [66, 70], hips: [92, 96] },
            M: { bust: [88, 92], waist: [70, 74], hips: [96, 100] },
            L: { bust: [92, 98], waist: [74, 80], hips: [100, 106] },
            XL: { bust: [98, 104], waist: [80, 86], hips: [106, 112] }
          },
          price_ranges: { min: 4500, max: 18000, currency: "LKR" },
          product_images: ["https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400"]
        },
        // {
        //   name: "Nike",
        //   category: "Sportswear",
        //   size_chart: {
        //     "5": { bust: [22, 22.5], waist: [22, 22.5], hips: [22, 22.5] },
        //     "5.5": { bust: [22.5, 23], waist: [22.5, 23], hips: [22.5, 23] },
        //     "6": { bust: [23, 23.5], waist: [23, 23.5], hips: [23, 23.5] },
        //     "6.5": { bust: [23.5, 24], waist: [23.5, 24], hips: [23.5, 24] },
        //     "7": { bust: [24, 24.5], waist: [24, 24.5], hips: [24, 24.5] },
        //     "7.5": { bust: [24.5, 25], waist: [24.5, 25], hips: [24.5, 25] },
        //     "8": { bust: [25, 25.5], waist: [25, 25.5], hips: [25, 25.5] },
        //     "8.5": { bust: [25.5, 26], waist: [25.5, 26], hips: [25.5, 26] },
        //     "9": { bust: [26, 26.5], waist: [26, 26.5], hips: [26, 26.5] },
        //     "9.5": { bust: [26.5, 27], waist: [26.5, 27], hips: [26.5, 27] },
        //     "10": { bust: [27, 27.5], waist: [27, 27.5], hips: [27, 27.5] }
        //   },
        //   price_ranges: { min: 30, max: 120, currency: "USD" },
        //   product_images: ["https://images.unsplash.com/photo-1556906781-9cba4a95f41d?w=400"]
        // },
        {
          name: "Adidas",
          category: "Sportswear",
          size_chart: {
           "5": { bust: [22, 22.5], waist: [22, 22.5], hips: [22, 22.5] },
            "5.5": { bust: [22.5, 23], waist: [22.5, 23], hips: [22.5, 23] },
            "6": { bust: [23, 23.5], waist: [23, 23.5], hips: [23, 23.5] },
            "6.5": { bust: [23.5, 24], waist: [23.5, 24], hips: [23.5, 24] },
            "7": { bust: [24, 24.5], waist: [24, 24.5], hips: [24, 24.5] },
            "7.5": { bust: [24.5, 25], waist: [24.5, 25], hips: [24.5, 25] },
            "8": { bust: [25, 25.5], waist: [25, 25.5], hips: [25, 25.5] },
            "8.5": { bust: [25.5, 26], waist: [25.5, 26], hips: [25.5, 26] },
            "9": { bust: [26, 26.5], waist: [26, 26.5], hips: [26, 26.5] },
            "9.5": { bust: [26.5, 27], waist: [26.5, 27], hips: [26.5, 27] },
            "10": { bust: [27, 27.5], waist: [27, 27.5], hips: [27, 27.5] }
          },
          price_ranges: { min: 10500, max: 30000, currency: "LKR" },
          product_images: ["https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/shoes_men_tcc_d_44a809233a.jpg"]
        },
        {
          name: "Mango",
          category: "Formal Wear",
          size_chart: {
            XS: { bust: [79, 83], waist: [61, 65], hips: [87, 91] },
            S: { bust: [83, 87], waist: [65, 69], hips: [91, 95] },
            M: { bust: [87, 91], waist: [69, 73], hips: [95, 99] },
            L: { bust: [91, 97], waist: [73, 79], hips: [99, 105] },
            XL: { bust: [97, 103], waist: [79, 85], hips: [105, 111] }
          },
          price_ranges: { min: 12000, max: 45000, currency: "LKR" },
          product_images: ["https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400"]
        },
        {
          name: "Gap",
          category: "Casual Wear",
          size_chart: {
            XS: { bust: [81, 85], waist: [63, 67], hips: [89, 93] },
            S: { bust: [85, 89], waist: [67, 71], hips: [93, 97] },
            M: { bust: [89, 93], waist: [71, 75], hips: [97, 101] },
            L: { bust: [93, 99], waist: [75, 81], hips: [101, 107] },
            XL: { bust: [99, 105], waist: [81, 87], hips: [107, 113] }
          },
          price_ranges: { min: 7500, max: 21000, currency: "LKR" },
          product_images: ["https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400"]
        },
        {
          name: "Nike Shoes",
          category: "Footwear",
          size_chart: {
            "5": { bust: [22, 22.5], waist: [22, 22.5], hips: [22, 22.5] },
            "5.5": { bust: [22.5, 23], waist: [22.5, 23], hips: [22.5, 23] },
            "6": { bust: [23, 23.5], waist: [23, 23.5], hips: [23, 23.5] },
            "6.5": { bust: [23.5, 24], waist: [23.5, 24], hips: [23.5, 24] },
            "7": { bust: [24, 24.5], waist: [24, 24.5], hips: [24, 24.5] },
            "7.5": { bust: [24.5, 25], waist: [24.5, 25], hips: [24.5, 25] },
            "8": { bust: [25, 25.5], waist: [25, 25.5], hips: [25, 25.5] },
            "8.5": { bust: [25.5, 26], waist: [25.5, 26], hips: [25.5, 26] },
            "9": { bust: [26, 26.5], waist: [26, 26.5], hips: [26, 26.5] },
            "9.5": { bust: [26.5, 27], waist: [26.5, 27], hips: [26.5, 27] },
            "10": { bust: [27, 27.5], waist: [27, 27.5], hips: [27, 27.5] }
          },
          shoe_size_note: "US Women's sizes based on foot length in cm",
          price_ranges: { min: 18000, max: 60000, currency: "LKR" },
          product_images: ["https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400"]
        },
        // {
        //   name: "Adidas Shoes",
        //   category: "Footwear",
        //   size_chart: {
        //     "5": { bust: [22, 22.5], waist: [22, 22.5], hips: [22, 22.5] },
        //     "5.5": { bust: [22.5, 23], waist: [22.5, 23], hips: [22.5, 23] },
        //     "6": { bust: [23, 23.5], waist: [23, 23.5], hips: [23, 23.5] },
        //     "6.5": { bust: [23.5, 24], waist: [23.5, 24], hips: [23.5, 24] },
        //     "7": { bust: [24, 24.5], waist: [24, 24.5], hips: [24, 24.5] },
        //     "7.5": { bust: [24.5, 25], waist: [24.5, 25], hips: [24.5, 25] },
        //     "8": { bust: [25, 25.5], waist: [25, 25.5], hips: [25, 25.5] },
        //     "8.5": { bust: [25.5, 26], waist: [25.5, 26], hips: [25.5, 26] },
        //     "9": { bust: [26, 26.5], waist: [26, 26.5], hips: [26, 26.5] },
        //     "9.5": { bust: [26.5, 27], waist: [26.5, 27], hips: [26.5, 27] },
        //     "10": { bust: [27, 27.5], waist: [27, 27.5], hips: [27, 27.5] }
        //   },
        //   shoe_size_note: "US Women's sizes based on foot length in cm",
        //   price_ranges: { min: 50, max: 180, currency: "USD" },
        //   product_images: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400"]
        // },
        {
          name: "Converse",
          category: "Footwear",
          size_chart: {
            "5": { bust: [22.5, 23], waist: [22.5, 23], hips: [22.5, 23] },
            "5.5": { bust: [23, 23.5], waist: [23, 23.5], hips: [23, 23.5] },
            "6": { bust: [23.5, 24], waist: [23.5, 24], hips: [23.5, 24] },
            "6.5": { bust: [24, 24.5], waist: [24, 24.5], hips: [24, 24.5] },
            "7": { bust: [24.5, 25], waist: [24.5, 25], hips: [24.5, 25] },
            "7.5": { bust: [25, 25.5], waist: [25, 25.5], hips: [25, 25.5] },
            "8": { bust: [25.5, 26], waist: [25.5, 26], hips: [25.5, 26] },
            "8.5": { bust: [26, 26.5], waist: [26, 26.5], hips: [26, 26.5] },
            "9": { bust: [26.5, 27], waist: [26.5, 27], hips: [26.5, 27] },
            "9.5": { bust: [27, 27.5], waist: [27, 27.5], hips: [27, 27.5] },
            "10": { bust: [27.5, 28], waist: [27.5, 28], hips: [27.5, 28] }
          },
          shoe_size_note: "US Women's sizes based on foot length in cm",
          price_ranges: { min: 12000, max: 27000, currency: "LKR" },
          product_images: ["https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400"]
        }
      ];

      // Calculate recommendations for each brand
      const recs: Recommendation[] = brands.map((brand: any) => {
        const { size, alternative, confidence } = calculateSize(measurementData, brand.size_chart);
        return {
          brandName: brand.name,
          size,
          alternative,
          confidence,
          category: brand.category,
          priceRange: brand.price_ranges ? {
            min: brand.price_ranges.min,
            max: brand.price_ranges.max,
            currency: brand.price_ranges.currency
          } : undefined,
          productImages: brand.product_images || []
        };
      });

      setRecommendations(recs);
      setLoading(false);
    } catch (error) {
      console.error("Error loading results:", error);
      toast.error("Failed to load results");
      setLoading(false);
    }
  };

  const sendEmailAutomatically = async (emailAddress: string) => {
    if (!emailAddress || recommendations.length === 0) {
      return;
    }

    try {
      const isAuthenticated = authAPI.isAuthenticated();
      
      if (isAuthenticated) {
        // User is logged in - send via backend
        const token = authAPI.getAccessToken();
        if (!token) return;

        await emailApi.sendResultsEmail(
          {
            measurements: {
              bust: measurements.bust,
              waist: measurements.waist,
              hips: measurements.hips,
              bodyType: measurements.bodyType
            },
            recommendations: recommendations,
            email: emailAddress
          },
          token
        );
        
        toast.success(`Size guide sent to ${emailAddress}!`, {
          description: "Check your inbox for your personalized recommendations",
          duration: 5000,
        });
      } else {
        // Not logged in - use EmailJS
        const emailData = {
          to_email: emailAddress,
          user_name: emailAddress.split('@')[0] || "Valued Customer",
          measurements: {
            bust: measurements.bust,
            waist: measurements.waist,
            hips: measurements.hips,
            bodyType: measurements.bodyType
          },
          recommendations: recommendations
        };

        await sendSizeRecommendations(emailData);
        
        toast.success(`Size guide sent to ${emailAddress}!`, {
          description: "Check your inbox for your personalized recommendations",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Auto-email error:", error);
      // Don't show error toast for automatic send, user can still manually send
    }
  };

  const handleEmailResults = async () => {
    const loadingToast = toast.loading("Sending email...");

    try {
      const isAuthenticated = authAPI.isAuthenticated();
      
      if (isAuthenticated) {
        // User is logged in - use backend API with nodemailer
        const token = authAPI.getAccessToken();
        
        if (!token) {
          throw new Error("Please log in again to send email");
        }

        const emailToSend = email || measurements?.email;

        // Send via backend API
        const response = await emailApi.sendResultsEmail(
          {
            measurements: {
              bust: measurements.bust,
              waist: measurements.waist,
              hips: measurements.hips,
              bodyType: measurements.bodyType
            },
            recommendations: recommendations,
            email: emailToSend // Use custom email if provided, otherwise backend uses user's registered email
          },
          token
        );

        toast.dismiss(loadingToast);
        toast.success(`Results sent to ${response.email}!`, {
          description: "Check your inbox for your personalized recommendations",
          duration: 5000,
        });
        setEmailDialogOpen(false);
      } else {
        // User is not logged in - use EmailJS
        const emailToSend = email || measurements?.email;
        
        if (!emailToSend) {
          toast.dismiss(loadingToast);
          toast.error("Please enter an email address");
          return;
        }

        const emailData = {
          to_email: emailToSend,
          user_name: emailToSend.split('@')[0] || "Valued Customer",
          measurements: {
            bust: measurements.bust,
            waist: measurements.waist,
            hips: measurements.hips,
            bodyType: measurements.bodyType
          },
          recommendations: recommendations
        };

        await sendSizeRecommendations(emailData);
        
        toast.dismiss(loadingToast);
        toast.success(`Results sent to ${emailToSend}!`);
        setEmailDialogOpen(false);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(
        error instanceof Error 
          ? error.message 
          : "Failed to send email. Please try again."
      );
    }
  };

  const handleDownloadPDF = () => {
    try {
      if (!measurements || recommendations.length === 0) {
        toast.error("No data available to generate PDF");
        return;
      }

      generateSizeReportPDF(measurements, recommendations);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Calculating your perfect sizes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Profile Summary */}
          <Card className="mb-8 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Your Profile</h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Ruler className="w-4 h-4" />
                        {measurements?.bust}/{measurements?.waist}/{measurements?.hips} cm
                      </span>
                      <Badge variant="secondary">{measurements?.bodyType?.replace('_', ' ')}</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="outline" onClick={() => navigate("/measurements")}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Edit Measurements
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Results
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Email Your Size Guide</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email-input">Email Address</Label>
                    <Input
                      id="email-input"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {measurements?.email && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Using email from your measurements
                      </p>
                    )}
                  </div>
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <p className="font-semibold text-sm">📋 What you'll receive:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Your personalized sizes</li>
                      <li>• Brand comparison chart</li>
                      <li>• Measurement tips</li>
                    </ul>
                  </div>
                  <Button onClick={handleEmailResults} className="w-full gradient-primary">
                    Send Report
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline" onClick={handleDownloadPDF}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>

          {/* Recommendations Grid */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Size Recommendations</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((rec, index) => (
                <Card key={index} className="card-hover overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-xl">{rec.brandName}</CardTitle>
                    <Badge variant="secondary" className="w-fit">
                      {rec.category}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Product Images Gallery */}
                    {rec.productImages && rec.productImages.length > 0 && (
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                        <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                          {rec.productImages.map((img, imgIndex) => (
                            <img
                              key={imgIndex}
                              src={img}
                              alt={`${rec.brandName} product ${imgIndex + 1}`}
                              className="w-full h-48 object-cover rounded-lg snap-center flex-shrink-0"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="text-center p-6 bg-primary/5 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Recommended Size</p>
                      <p className="text-4xl font-bold text-primary">{rec.size}</p>
                    </div>
                    
                    {rec.alternative && (
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Alternative Size</p>
                        <p className="text-lg font-semibold">{rec.alternative}</p>
                      </div>
                    )}

                    {/* Price Range */}
                    {rec.priceRange && (
                      <div className="flex items-center gap-2 p-3 bg-accent/10 rounded-lg">
                        <DollarSign className="w-4 h-4 text-accent" />
                        <span className="text-sm font-semibold text-accent">
                          {rec.priceRange.currency} {rec.priceRange.min.toLocaleString()} - {rec.priceRange.max.toLocaleString()}
                        </span>
                      </div>
                    )}
                    
                    {/* <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Confidence</span>
                      <span className="font-semibold text-accent">{rec.confidence}%</span>
                    </div> */}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Results;
