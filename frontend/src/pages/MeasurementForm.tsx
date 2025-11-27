import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import formBackground from "@/assets/measurement-form-bg.jpg";

interface MeasurementData {
  height: number;
  bust: number;
  waist: number;
  hips: number;
  bodyType: string;
  region: string;
  occasions: string[];
  email: string;
}

const MeasurementForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<MeasurementData>({
    height: 165,
    bust: 90,
    waist: 70,
    hips: 95,
    bodyType: "",
    region: "",
    occasions: [],
    email: "",
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const bodyTypes = [
    { id: "apple", title: "Apple Shape", desc: "Wider midsection, narrower hips" },
    { id: "pear", title: "Pear Shape", desc: "Narrower shoulders, wider hips" },
    { id: "hourglass", title: "Hourglass Shape", desc: "Balanced bust and hips, defined waist" },
    { id: "rectangle", title: "Rectangle Shape", desc: "Straight silhouette, minimal waist definition" },
    { id: "inverted_triangle", title: "Inverted Triangle", desc: "Broader shoulders, narrower hips" },
  ];

  const occasions = [
    "Casual Wear",
    "Formal/Office Wear",
    "Sportswear/Activewear",
    "Evening Wear",
    "Swimwear",
  ];

  const regions = [
    "Sri Lanka",
    "United States",
    "United Kingdom",
    "European Union",
    "Australia",
  ];

  const handleNext = () => {
    if (step === 1) {
      if (formData.height < 140 || formData.bust < 70 || formData.waist < 55 || formData.hips < 75) {
        toast.error("Please ensure all measurements are within valid ranges");
        return;
      }
    }
    if (step === 2 && !formData.bodyType) {
      toast.error("Please select your body type");
      return;
    }
    if (step === 3 && (!formData.region || formData.occasions.length === 0)) {
      toast.error("Please select your region and at least one occasion");
      return;
    }
    
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleOccasionToggle = (occasion: string) => {
    setFormData(prev => ({
      ...prev,
      occasions: prev.occasions.includes(occasion)
        ? prev.occasions.filter(o => o !== occasion)
        : [...prev.occasions, occasion]
    }));
  };

  const handleSubmit = async () => {
    try {
      const measurementData = {
        ...formData,
        email: formData.email || null,
      };
      
      // Store in localStorage for now, will be saved to DB in Results page
      localStorage.setItem("measurementData", JSON.stringify(measurementData));
      
      toast.success("Generating your recommendations...");
      navigate("/results");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 -z-10 opacity-5"
        style={{
          backgroundImage: `url(${formBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero Banner */}
        <div className="relative py-12 overflow-hidden gradient-hero">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.unsplash.com/photo-1445384763658-0400939829cd?w=1920"
              alt="Fashion background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Your Personal Measurement Profile
            </h1>
            <p className="text-xl text-muted-foreground">
              Answer a few questions to get personalized size recommendations
            </p>
          </div>
        </div>

        <div className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8">
            <Progress value={progress} className="h-3" />
            <p className="text-center mt-3 text-sm text-muted-foreground">
              Step {step} of {totalSteps}
            </p>
          </div>

          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl">
                {step === 1 && "Enter Your Measurements"}
                {step === 2 && "Select Your Body Type"}
                {step === 3 && "Your Preferences"}
                {step === 4 && "Email Your Results (Optional)"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Provide accurate measurements for best results"}
                {step === 2 && "Choose the shape that best describes your body"}
                {step === 3 && "Tell us about your shopping habits"}
                {step === 4 && "Receive your personalized size guide via email"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Step 1: Measurements */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label>Height (cm)</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Measure without shoes</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.height]}
                        onValueChange={(value) => setFormData({ ...formData, height: value[0] })}
                        min={140}
                        max={200}
                        step={1}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) })}
                        className="w-24"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label>Bust (cm)</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Measure around the fullest part</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.bust]}
                        onValueChange={(value) => setFormData({ ...formData, bust: value[0] })}
                        min={70}
                        max={150}
                        step={1}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        value={formData.bust}
                        onChange={(e) => setFormData({ ...formData, bust: parseInt(e.target.value) })}
                        className="w-24"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label>Waist (cm)</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Measure at the narrowest point</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.waist]}
                        onValueChange={(value) => setFormData({ ...formData, waist: value[0] })}
                        min={55}
                        max={130}
                        step={1}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        value={formData.waist}
                        onChange={(e) => setFormData({ ...formData, waist: parseInt(e.target.value) })}
                        className="w-24"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label>Hips (cm)</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Measure around the fullest part</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.hips]}
                        onValueChange={(value) => setFormData({ ...formData, hips: value[0] })}
                        min={75}
                        max={160}
                        step={1}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        value={formData.hips}
                        onChange={(e) => setFormData({ ...formData, hips: parseInt(e.target.value) })}
                        className="w-24"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Body Type */}
              {step === 2 && (
                <RadioGroup value={formData.bodyType} onValueChange={(value) => setFormData({ ...formData, bodyType: value })}>
                  <div className="grid gap-4">
                    {bodyTypes.map((type) => (
                      <Label
                        key={type.id}
                        htmlFor={type.id}
                        className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.bodyType === type.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value={type.id} id={type.id} />
                        <div>
                          <p className="font-semibold">{type.title}</p>
                          <p className="text-sm text-muted-foreground">{type.desc}</p>
                        </div>
                      </Label>
                    ))}
                  </div>
                </RadioGroup>
              )}

              {/* Step 3: Preferences */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label>Region</Label>
                    <Select value={formData.region} onValueChange={(value) => setFormData({ ...formData, region: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Shopping Occasions (select all that apply)</Label>
                    <div className="grid grid-cols-1 gap-3">
                      {occasions.map((occasion) => (
                        <Label
                          key={occasion}
                          className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                        >
                          <Checkbox
                            checked={formData.occasions.includes(occasion)}
                            onCheckedChange={() => handleOccasionToggle(occasion)}
                          />
                          <span>{occasion}</span>
                        </Label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Email */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <p className="font-semibold text-sm">📋 What you'll receive:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Your personalized sizes for all brands</li>
                      <li>• Brand comparison chart</li>
                      <li>• Measurement tips</li>
                    </ul>
                  </div>

                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    🔒 Privacy: We respect your privacy and never share your data
                  </p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-6">
                {step > 1 && (
                  <Button variant="outline" onClick={handleBack} className="flex-1">
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                )}
                <Button onClick={handleNext} className="flex-1 gradient-primary">
                  {step === totalSteps ? "View Results" : "Next Step"}
                  {step < totalSteps && <ChevronRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MeasurementForm;
