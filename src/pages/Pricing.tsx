import { SubscriptionButton } from "@/components/SubscriptionButton";

export default function Pricing() {
  return (
    <main className="flex-1">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Choose Your Plan
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the perfect plan for your code analysis needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 animate-fade-in-up">
            {/* Free Tier */}
            <div className="rounded-lg border p-6 space-y-4 bg-card">
              <h2 className="text-2xl font-bold">Free</h2>
              <p className="text-3xl font-bold">$0<span className="text-lg font-normal text-muted-foreground">/month</span></p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• 1 analysis per day</li>
                <li>• Basic code insights</li>
                <li>• Community support</li>
              </ul>
              <p className="text-sm text-muted-foreground">Perfect for occasional use</p>
            </div>

            {/* Pro Tier */}
            <div className="rounded-lg border p-6 space-y-4 bg-card relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
                Popular
              </div>
              <h2 className="text-2xl font-bold">Pro</h2>
              <p className="text-3xl font-bold">$9.99<span className="text-lg font-normal text-muted-foreground">/month</span></p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• 100 analyses per day</li>
                <li>• Detailed code insights</li>
                <li>• Priority support</li>
              </ul>
              <SubscriptionButton
                tier="pro"
                priceId="price_1Qc96EF80ze3XcIjv1wATjPg"
                price="9.99"
                features={[
                  "100 analyses per day",
                  "Priority support",
                  "Detailed code insights",
                ]}
              />
            </div>

            {/* Plus Tier */}
            <div className="rounded-lg border p-6 space-y-4 bg-card">
              <h2 className="text-2xl font-bold">Plus</h2>
              <p className="text-3xl font-bold">$29.99<span className="text-lg font-normal text-muted-foreground">/month</span></p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Unlimited analyses</li>
                <li>• Advanced code insights</li>
                <li>• Premium support</li>
                <li>• Team collaboration</li>
              </ul>
              <SubscriptionButton
                tier="plus"
                priceId="price_1Qc96dF80ze3XcIjGggGJdaD"
                price="29.99"
                features={[
                  "Unlimited analyses",
                  "Premium support",
                  "Advanced code insights",
                  "Team collaboration",
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}