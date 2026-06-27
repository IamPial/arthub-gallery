import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { PRICING_ID, stripe } from "@/lib/stripe";
import { getUserSession } from "@/lib/core/session";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    // const PRICE_ID = "price_1TmneuEzq9qApb9shf7JHVP4";

    const formData = await request.formData();
    const planId = formData.get("plan_id");
    const pricingId = PRICING_ID[planId];
    const userSession = await getUserSession();
    const user = userSession?.user;

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: pricingId,
          quantity: 1,
        },
      ],
      metadata: {
        priceId: pricingId,
        userId: user?.id,
        userEmail: user?.email,
      },
      mode: "subscription",
      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
