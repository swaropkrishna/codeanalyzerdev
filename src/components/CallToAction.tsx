import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="py-section bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4 text-foreground animate-fade-in">
          Ready to Save Time and Stay Organized?
        </h2>
        <p className="text-xl text-secondary-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up">
          Start summarizing your notes for free. Upgrade anytime for more features.
        </p>
        <Button
          onClick={() => navigate("/auth")}
          className="bg-cta hover:bg-cta-hover text-cta-foreground text-lg px-8 py-6 h-auto animate-fade-in-up"
        >
          Get Started for Free
        </Button>
      </div>
    </section>
  );
};