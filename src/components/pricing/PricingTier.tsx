import { ReactNode } from "react";
import { SubscriptionButton } from "@/components/SubscriptionButton";

interface PricingTierProps {
  title: string;
  description: string;
  price: string | number;
  features: string[];
  priceId?: string;
  tier?: "pro" | "plus";
  isPopular?: boolean;
  isFreeTier?: boolean;
  currentTier?: string;
}

export function PricingTier({
  title,
  description,
  price,
  features,
  priceId,
  tier,
  isPopular,
  isFreeTier,
  currentTier
}: PricingTierProps) {
  // Check if this is the current tier card
  const isCurrentTier = currentTier?.toLowerCase() === title.toLowerCase();

  // Function to determine if button should be hidden based on current tier
  const shouldHideButton = () => {
    const currentTierLower = currentTier?.toLowerCase();
    const titleLower = title.toLowerCase();

    if (currentTierLower === 'plus') {
      return titleLower === 'free' || titleLower === 'pro';
    } else if (currentTierLower === 'pro') {
      return titleLower === 'free';
    }
    return false;
  };

  return (
    <div className={`rounded-lg border p-8 bg-card relative flex flex-col h-full ${isCurrentTier ? 'border-primary border-2' : ''}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
          Popular
        </div>
      )}
      <div className="flex-grow space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
          <div className="flex items-baseline text-3xl font-bold">
            ${price}
            <span className="ml-1 text-lg font-normal text-muted-foreground">/month</span>
          </div>
        </div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-muted-foreground">
              <svg
                className="mr-2 h-4 w-4 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 pt-6 border-t">
        {shouldHideButton() ? null : (
          isFreeTier ? (
            <button
              className="w-full px-4 py-2 text-sm font-medium text-muted-foreground bg-secondary rounded-md hover:bg-secondary/80"
              disabled
            >
              Current Plan
            </button>
          ) : (
            <SubscriptionButton
              tier={tier || "pro"}
              priceId={priceId || ""}
            />
          )
        )}
      </div>
    </div>
  );
}