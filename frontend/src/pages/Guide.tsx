import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ruler, CheckCircle2 } from "lucide-react";
import measurementGuide from "@/assets/measurement-guide.jpg";

const Guide = () => {
  const measurementTips = [
    "Wear fitted clothing or undergarments",
    "Use a flexible measuring tape",
    "Measure in front of a mirror",
    "Take measurements twice for accuracy",
    "Stand straight with relaxed posture",
    "Don't pull the tape too tight"
  ];

  const bodyTypes = [
    {
      name: "Apple Shape",
      description: "Wider midsection with narrower hips. Weight typically carried around the stomach.",
      tips: "Look for empire waist tops and A-line dresses",
      image: "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2023-07/TorridSeamlessSmoothingSlipDress-998134.png",
      occasions: "Perfect for casual outings, office wear, and weekend brunches"
    },
    {
      name: "Pear Shape",
      description: "Narrower shoulders with wider hips and thighs. Weight carried in lower body.",
      tips: "Try boat necks and fitted tops with A-line skirts",
      image: "https://i.pinimg.com/1200x/a3/7b/83/a37b8303a688929fc1381f4d0a8385a3.jpg?h=200",
      occasions: "Great for formal events, cocktail parties, and date nights"
    },
    {
      name: "Hourglass Shape",
      description: "Balanced bust and hips with a defined waist. Proportional upper and lower body.",
      tips: "Fitted clothes that emphasize your waist work best",
      image: "https://i.pinimg.com/736x/64/c0/c9/64c0c9b54ecbef93daa5c2b85db5e37b.jpg",
      occasions: "Ideal for business meetings, evening dinners, and special occasions"
    },
    {
      name: "Rectangle Shape",
      description: "Straight silhouette with minimal waist definition. Similar bust and hip measurements.",
      tips: "Create curves with belts and peplum styles",
      image: "https://i.pinimg.com/1200x/ed/b0/69/edb0691a9a241b194b5919b32fe1d9de.jpg",
      occasions: "Versatile for everyday wear, casual shopping, and travel"
    },
    {
      name: "Inverted Triangle",
      description: "Broader shoulders with narrower hips. Athletic build with wider upper body.",
      tips: "Balance with darker tops and detailed bottoms",
      image: "https://i.pinimg.com/736x/57/91/2c/57912c4f56ad4c0246a54d44ebc8ce1b.jpg",
      occasions: "Excellent for gym-to-street, active lifestyle, and sporty events"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Measurement Guide</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to take accurate measurements for perfect size recommendations
            </p>
          </div>

          {/* How to Measure */}
          <section className="mb-16">
            {/* Measurement Guide Image */}
            <div className="mb-12">
              <div className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-large">
                <img 
                  src={measurementGuide} 
                  alt="Step-by-step measurement guide showing bust, waist, and hips measurements" 
                  className="w-full h-auto"
                />
              </div>
              <p className="text-center mt-4 text-muted-foreground">
                Follow our visual guide to take accurate measurements
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Ruler className="w-8 h-8 text-primary" />
              Shopping Occasions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle>Casual Wear</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
                      alt="Casual wear fashion and everyday outfits"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Perfect for everyday activities, coffee dates, shopping trips, and relaxed weekend outings. 
                    Features comfortable fabrics, relaxed fits, and versatile pieces like jeans, t-shirts, and casual dresses.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle>Formal/Office Wear</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800"
                      alt="Professional office wear and formal attire"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ideal for business meetings, office environments, professional events, and formal occasions. 
                    Includes tailored suits, blazers, dress shirts, pencil skirts, and elegant dresses.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle>Sportswear/Activewear</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800"
                      alt="Activewear and sportswear for fitness"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Designed for gym sessions, yoga classes, running, and active lifestyles. 
                    Features moisture-wicking fabrics, flexible materials, sports bras, leggings, and performance tops.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle>Swimwear</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/9617027/pexels-photo-9617027.jpeg"
                      alt="Swimwear and beachwear collection"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Essential for beach vacations, pool parties, and water activities. 
                    Includes bikinis, one-pieces, tankinis, and swim trunks with quick-dry fabrics and supportive designs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Tips Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Tips for Accurate Measurements</h2>
            <Card className="shadow-elegant">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {measurementTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Body Types */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Understanding Body Types</h2>
            <div className="space-y-6">
              {bodyTypes.map((type, index) => (
                <Card key={index} className="shadow-elegant">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-3 gap-0">
                      <div className="aspect-square md:aspect-auto overflow-hidden">
                        <img
                          src={type.image}
                          alt={`${type.name} body type fashion`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:col-span-2 p-6 space-y-4">
                        <CardTitle className="text-xl">{type.name}</CardTitle>
                        <p className="text-muted-foreground">{type.description}</p>
                        <div className="bg-primary/5 p-4 rounded-lg space-y-2">
                          <p className="text-sm">
                            <span className="font-semibold">Styling Tip:</span> {type.tips}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold">Best For:</span> {type.occasions}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Guide;
