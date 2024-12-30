import { Shield, MessageSquare, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function Benefits() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Globe className="h-12 w-12 text-primary" />,
      title: "Multi-language Support",
      description: "Analyze code in any programming language with our advanced AI-powered tool."
    },
    {
      icon: <MessageSquare className="h-12 w-12 text-primary" />,
      title: "Detailed Error Explanations",
      description: "Get comprehensive explanations and solutions for any code issues detected."
    },
    {
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: "Secure Code Handling",
      description: "Your code is processed securely and never stored without your permission."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Senior Developer",
      content: "This tool has saved me countless hours debugging complex issues. The explanations are clear and helpful."
    },
    {
      name: "Michael Chen",
      role: "Full Stack Engineer",
      content: "The multi-language support is fantastic. I use it for both frontend and backend code analysis."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Feature Highlights */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Code Analyzer?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get instant, accurate code analysis with detailed explanations and suggestions for improvement.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 rounded-lg border bg-card">
                <p className="text-muted-foreground mb-4">{testimonial.content}</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Code?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers who use our tool to write better code faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8"
              onClick={() => navigate("/auth?view=sign_up")}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8"
              onClick={() => navigate("/features")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}