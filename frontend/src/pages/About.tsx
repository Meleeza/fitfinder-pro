import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, TrendingDown, Leaf, Shield } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About FitFinder</h1>
            <p className="text-xl text-muted-foreground">
              Empowering women through perfect fit and body positivity
            </p>
          </div>

          <div className="space-y-12">
            {/* Mission */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <Card className="shadow-elegant">
                  <CardContent className="p-8">
                    <p className="text-lg leading-relaxed">
                      FitFinder exists to transform online fashion shopping by providing personalized size 
                      recommendations that celebrate body diversity. We believe every woman deserves to find 
                      clothes that fit perfectly and make her feel confident, regardless of brand or body type.
                    </p>
                  </CardContent>
                </Card>
                <div className="rounded-2xl overflow-hidden shadow-large">
                  <img
                    src="https://i.pinimg.com/736x/ef/6f/6c/ef6f6cf721741a230692eb6be336f9cb.jpg"
                    alt="Diverse fashion models"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </section>

            {/* The Problem */}
            <section>
              <h2 className="text-3xl font-bold mb-6">The Problem We're Solving</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-elegant">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                      <TrendingDown className="w-6 h-6 text-destructive" />
                    </div>
                    <h3 className="text-xl font-bold">High Return Rates</h3>
                    <p className="text-muted-foreground">
                      30-40% of online fashion purchases are returned due to poor fit, creating 
                      frustration for shoppers and significant costs for retailers.
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-elegant">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-destructive" />
                    </div>
                    <h3 className="text-xl font-bold">Confidence Issues</h3>
                    <p className="text-muted-foreground">
                      Inconsistent sizing across brands leads to confusion and can negatively impact 
                      self-esteem and shopping confidence.
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-elegant">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-destructive" />
                    </div>
                    <h3 className="text-xl font-bold">Environmental Impact</h3>
                    <p className="text-muted-foreground">
                      Returns contribute to carbon emissions and waste. Better sizing means fewer 
                      returns and a smaller environmental footprint.
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-elegant">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-destructive" />
                    </div>
                    <h3 className="text-xl font-bold">Lack of Standards</h3>
                    <p className="text-muted-foreground">
                      Fashion brands lack standardized sizing, making it difficult to know your size 
                      across different retailers.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Our Solution */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Our Solution</h2>
              <Card className="shadow-elegant">
                <CardContent className="p-8 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3">Smart Algorithm</h3>
                    <p className="text-muted-foreground">
                      Our algorithm considers your unique measurements, body type, and shopping preferences 
                      to provide accurate size recommendations across multiple brands.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">20+ Brand Partnerships</h3>
                    <p className="text-muted-foreground">
                      We've analyzed sizing data from popular fashion brands including Zara, H&M, Nike, 
                      ASOS, and more to give you comprehensive recommendations.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Data-Driven Insights</h3>
                    <p className="text-muted-foreground">
                      Our recommendations are based on actual brand size charts and real user feedback, 
                      ensuring accuracy and reliability.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Commitments */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Our Commitment</h2>
              <Card className="shadow-elegant gradient-primary text-white">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-3">Privacy First</h3>
                      <p className="opacity-90">
                        Your measurements and personal data are encrypted and secure. We never share 
                        your information without permission.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3">Body Positive</h3>
                      <p className="opacity-90">
                        We celebrate all body types and sizes. No judgment, no body shaming - just 
                        accurate sizing information.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3">Inclusive Sizing</h3>
                      <p className="opacity-90">
                        We advocate for inclusive sizing in the fashion industry and work with brands 
                        to expand their size ranges.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3">Secure Platform</h3>
                      <p className="opacity-90">
                        Bank-level encryption protects your data. Your measurements are stored securely 
                        and only accessible by you.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
