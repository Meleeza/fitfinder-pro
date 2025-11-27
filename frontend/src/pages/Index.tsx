import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, ShoppingBag, Mail, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-image.jpg";
import workflowImage from "@/assets/fitfinder-workflow.jpg";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 gradient-hero opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Find Your <span className="text-primary">Perfect Fit</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Get personalized size recommendations across 20+ fashion brands based on your unique measurements
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/measurements">
                    <Button size="lg" className="gradient-primary w-full sm:w-auto">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/guide">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      How to Measure
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="Diverse women fashion" 
                  className="rounded-3xl shadow-large w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            {/* Workflow Image */}
            <div className="mb-16 text-center">
              <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-large">
                <img 
                  src={workflowImage} 
                  alt="How FitFinder works - measurement to recommendation process" 
                  className="w-full h-auto"
                />
              </div>
              <p className="mt-4 text-muted-foreground">See how FitFinder helps you find the perfect size</p>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
              Why Choose FitFinder?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="card-hover border-2">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto gradient-primary rounded-full flex items-center justify-center">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Smart Sizing</h3>
                  <p className="text-muted-foreground">
                    AI-powered recommendations based on your unique measurements and body type
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover border-2">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto gradient-primary rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Multiple Brands</h3>
                  <p className="text-muted-foreground">
                    Get sizes for Zara, H&M, Nike, and 20+ more popular fashion brands
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover border-2">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto gradient-primary rounded-full flex items-center justify-center">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Save & Share</h3>
                  <p className="text-muted-foreground">
                    Email your personalized size guide for easy reference while shopping
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
              How It Works
            </h2>
            
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { step: "1", title: "Enter Measurements", desc: "Provide your body measurements" },
                { step: "2", title: "Select Body Type", desc: "Choose your body shape" },
                { step: "3", title: "Get Results", desc: "Receive instant recommendations" },
                { step: "4", title: "Save Results", desc: "Email your personalized guide" }
              ].map((item) => (
                <div key={item.step} className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto gradient-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 gradient-hero text-white">
          <div className="container mx-auto px-4 text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Find Your Perfect Fit?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join thousands of women who shop with confidence using FitFinder
            </p>
            <Link to="/measurements">
              <Button size="lg" variant="secondary" className="text-primary">
                Start Now - It's Free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
