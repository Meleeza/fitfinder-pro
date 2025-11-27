import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import faqHero from "@/assets/faq-hero.jpg";

const FAQ = () => {
  const faqs = [
    {
      question: "How accurate are your recommendations?",
      answer: "Our algorithm has an 85% accuracy rate based on user feedback. We continuously improve our recommendations by analyzing brand size charts and real user experiences. The accuracy depends on providing correct measurements and selecting the appropriate body type."
    },
    {
      question: "Do you store my measurements?",
      answer: "Measurements are temporarily stored in your browser's local storage for convenience. If you provide an email, we can save your profile securely for future use. However, you can use FitFinder as a guest and your data will only be stored locally on your device."
    },
    {
      question: "Which brands do you support?",
      answer: "We currently support 20+ popular fashion brands including Zara, H&M, Nike, Adidas, Forever 21, Mango, Gap, Levi's, ASOS, Uniqlo, and Marks & Spencer. We're constantly adding more brands based on user requests."
    },
    {
      question: "How do I measure myself correctly?",
      answer: "Visit our Measurement Guide page for detailed instructions with visual aids. Key tips: use a flexible measuring tape, wear fitted clothing, measure in front of a mirror, and take measurements twice for accuracy. Don't pull the tape too tight!"
    },
    {
      question: "What if I'm between sizes?",
      answer: "When you're between sizes, we provide an alternative size recommendation along with your primary size. We also show a confidence score to help you decide. Consider your body type and whether you prefer a fitted or relaxed fit when choosing between sizes."
    },
    {
      question: "Is my data secure?",
      answer: "Yes! We use bank-level encryption to protect your data. Your measurements are never shared with third parties without your explicit consent. We follow GDPR guidelines and you can request deletion of your data at any time."
    },
    {
      question: "Can I save multiple measurement profiles?",
      answer: "Currently, FitFinder supports one measurement profile per session. If you create an account with us, you'll be able to save multiple profiles in the future (feature coming soon!)."
    },
    {
      question: "Can I use this for men's clothing?",
      answer: "Currently, FitFinder focuses on women's sizing as different sizing standards apply to men's clothing. However, we're working on expanding to include men's fashion sizing in the future. Stay tuned!"
    },
    {
      question: "Why do sizes vary between brands?",
      answer: "Fashion brands use different sizing standards and fit models. A size M in Zara might fit differently than a size M in H&M. This is why FitFinder exists - to help you navigate these inconsistencies across brands."
    },
    {
      question: "What body types do you support?",
      answer: "We support five main body types: Apple (wider midsection), Pear (wider hips), Hourglass (balanced with defined waist), Rectangle (straight silhouette), and Inverted Triangle (broader shoulders). Our algorithm adjusts recommendations based on your selected body type."
    },
    {
      question: "Can I share my results with friends?",
      answer: "Yes! You can email your personalized size guide to yourself and share it with friends or family. This makes shopping together easier and more fun."
    },
    {
      question: "Do you offer recommendations for maternity wear?",
      answer: "Currently, our recommendations are for standard sizing. Maternity wear has different sizing considerations. We're exploring adding maternity sizing in future updates."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero Image */}
          <div className="mb-12 rounded-3xl overflow-hidden shadow-large">
            <img 
              src={faqHero} 
              alt="Women asking questions about fashion sizing" 
              className="w-full h-64 object-cover"
            />
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about FitFinder
            </p>
          </div>

          {/* Featured Video */}
          {/* <div className="mb-12">
            <div className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-large">
              <iframe
                className="w-full aspect-video"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="FitFinder FAQ Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-center mt-4 text-muted-foreground">
              Quick answers to your questions
            </p>
          </div> */}

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border rounded-lg px-6 shadow-soft"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Still have questions? Ready to get started?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/guide">
                <Button variant="outline">View Measurement Guide</Button>
              </Link>
              <Link to="/measurements">
                <Button className="gradient-primary">Get Your Sizes Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
