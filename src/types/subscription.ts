export type SubscriptionPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  priceId: string;
};

export type SubscriptionStatus = {
  isActive: boolean;
  plan?: SubscriptionPlan;
  endDate?: Date;
};