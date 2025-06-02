export const STRIPE_PUBLISHABLE_KEY = "pk_test_your_publishable_key";

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for getting started",
    price: 4.99,
    priceId: "price_basic",
    features: [
      "Up to 100 expenses per month",
      "Basic analytics",
      "CSV export",
      "Email support"
    ]
  },
  {
    id: "pro",
    name: "Pro",
    description: "For power users",
    price: 9.99,
    priceId: "price_pro",
    features: [
      "Unlimited expenses",
      "Advanced analytics",
      "Multiple currencies",
      "Priority support",
      "Custom categories",
      "Budget planning"
    ]
  },
  {
    id: "business",
    name: "Business",
    description: "For teams and businesses",
    price: 19.99,
    priceId: "price_business",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Role management",
      "API access",
      "Custom reporting",
      "Dedicated support"
    ]
  }
];