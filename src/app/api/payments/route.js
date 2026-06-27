import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { PRICING_ID, stripe } from "@/lib/stripe";
import { getUserSession } from "@/lib/core/session";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const formData = await request.formData();
    const productId = formData.get("productId");
    const price = formData.get("price");
    const title = formData.get("title");
    const artistId = formData.get("artistId");
    const artWorksImg = formData.get("artWorksImg");
    const artistName = formData.get("artistName");
    const description = formData.get("description")

    const userSession = await getUserSession();
    const user = userSession?.user;

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price_data: {
            currency: "usd",
            unit_amount: Number(price) * 100,
            product_data: {
              name: title,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        price: Number(price),
        userId: user?.id,
        userEmail: user?.email,
        title,
        productId,
        artistName,
        artistId,
        artWorksImg,
        description,
      },
      mode: "payment",
      success_url: `${origin}/pricing/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
