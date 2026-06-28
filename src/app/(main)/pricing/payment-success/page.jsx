import { redirect } from "next/navigation";

import { Card, Button } from "@heroui/react";
import {
  FiCheckCircle,
  FiMail,
  FiArrowRight,
  FiShoppingBag,
  FiInfo,
} from "react-icons/fi";
import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { transactions } from "@/lib/actions/transactions";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const { status, customer_details, amount_total, id: txnId } = session;
  const metadata = session?.metadata;
  const { userId, userEmail, userName } = session.metadata;
  const customerEmail = customer_details?.email;
  const formattedAmount = (amount_total / 100).toFixed(2);
  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    await transactions({
      ...metadata,
      sessionId: session_id,
      buyerId: userId,
      buyerEmail: userEmail,
      buyerName: userName,
      purchaseDate: new Date(),
    });
    return (
      <main className="w-full min-h-screen bg-[#0b0a14] flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-lg z-10">
          <Card className="w-full bg-[#131129]/40 border border-white/5 rounded-3xl backdrop-blur-md p-2">
            <Card.Header className="flex flex-col items-center justify-center text-center pt-8 pb-4 gap-4">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/5">
                <FiCheckCircle size={36} strokeWidth={2.5} />
              </div>

              <div className="flex flex-col gap-1">
                <Card.Title className="text-2xl font-black text-white tracking-wide">
                  Payment Successful!
                </Card.Title>
                <Card.Description className="text-xs text-slate-400 max-w-sm">
                  We appreciate your business! Your artwork payment has been
                  successfully secured.
                </Card.Description>
              </div>
            </Card.Header>

            <Card.Content className="px-6 py-4 flex flex-col gap-5">
              <div className="bg-[#1a163a]/50 border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-medium flex items-center gap-2">
                    <FiShoppingBag className="text-[#a78bfa]" size={14} /> Total
                    Charged
                  </span>
                  <span className="text-white font-black text-lg">
                    ${formattedAmount}
                  </span>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">
                    Payment Reference
                  </span>
                  <span
                    className="text-slate-400 font-mono max-w-[180px] truncate"
                    title={txnId}
                  >
                    {txnId}
                  </span>
                </div>
              </div>

              {/* Email Text Box */}
              <div className="flex items-start gap-3 bg-[#6f4ff2]/5 border border-[#6f4ff2]/20 rounded-2xl p-4">
                <FiMail className="text-[#a78bfa] shrink-0 mt-0.5" size={18} />
                <p className="text-xs text-slate-300 leading-relaxed">
                  A confirmation email with your purchase receipt details will
                  be sent to{" "}
                  <span className="text-[#a78bfa] font-bold">
                    {customerEmail}
                  </span>{" "}
                  shortly.
                </p>
              </div>

              <p className="text-[11px] text-slate-500 text-center font-medium flex items-center justify-center gap-1.5 mt-2">
                <FiInfo size={13} />
                If you have any questions, please email{" "}
                <a
                  href="mailto:orders@example.com"
                  className="text-slate-400 hover:text-white underline transition-colors"
                >
                  arthub@example.com
                </a>
              </p>
            </Card.Content>

            <Card.Footer className="px-6 pb-6 pt-2">
              <Link href="/dashboard/buyer">
                {" "}
                <Button className="w-full bg-[#6f4ff2] hover:bg-[#5b3ed4] text-white font-bold rounded-xl h-12 text-sm shadow-lg shadow-[#6f4ff2]/20 flex items-center justify-center gap-2 transition-all cursor-pointer">
                  <span>See Buying Artworks</span>
                  <FiArrowRight size={16} />
                </Button>{" "}
              </Link>
            </Card.Footer>
          </Card>
        </div>
      </main>
    );
  }
}
