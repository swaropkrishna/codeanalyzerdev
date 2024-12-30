import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <main className="flex-1 container mx-auto px-4 py-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Simple, transparent pricing</h1>
        <p className="text-xl text-muted-foreground">
          Choose the plan that's right for you
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Free Plan */}
        <div className="rounded-lg border bg-card p-8 space-y-6">
          <div>
            <h3 className="text-2xl font-bold">Free</h3>
            <p className="text-muted-foreground mt-1">Perfect for getting started</p>
          </div>
          
          <div className="text-4xl font-bold">$0</div>
          
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>5 code analyses per day</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>Basic error detection</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>Community support</span>
            </li>
          </ul>
          
          <Button 
            className="w-full"
            onClick={() => navigate("/auth?view=sign_up")}
          >
            Get Started
          </Button>
        </div>

        {/* Pro Plan */}
        <div className="rounded-lg border bg-card p-8 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm">
            Popular
          </div>
          
          <div>
            <h3 className="text-2xl font-bold">Pro</h3>
            <p className="text-muted-foreground mt-1">For power users</p>
          </div>
          
          <div className="text-4xl font-bold">$19<span className="text-xl font-normal text-muted-foreground">/mo</span></div>
          
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>Unlimited code analyses</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>Advanced error detection</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>Code optimization suggestions</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>Priority support</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>Custom analysis rules</span>
            </li>
          </ul>
          
          <Button 
            variant="default"
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
            onClick={() => navigate("/auth?view=sign_up")}
          >
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </main>
  );
}