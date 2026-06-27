import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PRICING_ID = {
  Pro: "price_1TmneuEzq9qApb9shf7JHVP4",
  Premium: "price_1Tmng5Ezq9qApb9sRnIhczlz",
};
