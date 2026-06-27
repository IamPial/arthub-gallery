"use client";

import { Card, Button } from "@heroui/react";
import { FiCheck, FiCpu, FiZap } from "react-icons/fi";
import { motion } from "motion/react";
import { FaInfinity } from "react-icons/fa";

const pricingPlans = [
  {
    name: "Free (Default)",
    price: "$0",
    period: "/ lifetime",
    limit: "3 paintings allowed",
    icon: <FiCpu className="text-slate-400" size={22} />,
    popular: false,
    bg: "bg-[#131129]/40 border-white/5",
    btnText: "Current Plan",
    btnClass: "bg-white/5 text-slate-300 border border-white/10",
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/ monthly",
    limit: "9 paintings allowed",
    icon: <FiZap className="text-[#a78bfa]" size={22} />,
    popular: true,
    bg: "bg-[#1a163a]/60 border-[#6f4ff2]/40 shadow-xl shadow-[#6f4ff2]/5 relative",
    btnText: "Upgrade to Pro",
    btnClass:
      "bg-[#6f4ff2] hover:bg-[#5b3ed4] text-white shadow-lg shadow-[#6f4ff2]/20",
  },
  {
    name: "Premium",
    price: "$19.99",
    period: "/ monthly",
    limit: "Unlimited paintings allowed",
    icon: <FaInfinity className="text-amber-400" size={22} />,

    popular: false,
    bg: "bg-[#131129]/40 border-white/5",
    btnText: "Go Premium",
    btnClass: "bg-white text-black hover:bg-slate-200",
  },
];

export default function PricingPage() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 flex flex-col items-center gap-12 overflow-hidden">
      <div className="text-center flex flex-col items-center gap-2">
        <span className="text-[10px] bg-[#6f4ff2]/10 border border-[#6f4ff2]/30 text-[#a78bfa] font-black px-3 py-1 rounded-full uppercase tracking-widest">
          Subscription
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-wide mt-2">
          Choose Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6f4ff2] to-[#a78bfa]">
            Creative Tier
          </span>
        </h2>
        <p className="text-xs text-slate-400 max-w-md mt-1 font-medium">
          Expand your network uplink boundaries and secure more slots for your
          artworks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-5xl">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, type: "spring", stiffness: 100 }}
            whileHover={{ y: -6 }}
            className="w-full flex"
          >
            <Card
              className={`w-full rounded-3xl border backdrop-blur-md flex flex-col justify-between ${plan.bg}`}
            >
              {plan.popular && (
                <span className="absolute top-4 right-4 text-[9px] bg-[#6f4ff2]/20 border border-[#6f4ff2]/60 text-[#a78bfa] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Popular
                </span>
              )}

              <div>
                <Card.Header className="p-6 pb-2 flex flex-col items-start gap-4">
                  <div className="p-3 bg-[#131129] border border-white/5 rounded-xl">
                    {plan.icon}
                  </div>
                  <div>
                    <Card.Title className="text-lg font-black text-white tracking-wide">
                      {plan.name}
                    </Card.Title>
                    <Card.Description className="text-xs text-slate-500 font-semibold mt-0.5 uppercase tracking-wider">
                      Arthub Package
                    </Card.Description>
                  </div>
                </Card.Header>

                <Card.Content className="p-6 pt-2 flex flex-col gap-6">
                  {/* Price display */}
                  <div className="flex items-baseline gap-1 my-2">
                    <span className="text-3xl md:text-4xl font-black text-white tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      {plan.period}
                    </span>
                  </div>

                  <div className="w-full h-px bg-white/5" />

                  <ul className="flex flex-col gap-3">
                    <li className="flex items-center gap-2.5 text-sm font-medium text-slate-300">
                      <div className="p-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400">
                        <FiCheck size={12} strokeWidth={3} />
                      </div>
                      <span>{plan.limit}</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm font-medium text-slate-400 opacity-60">
                      <div className="p-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400">
                        <FiCheck size={12} strokeWidth={3} />
                      </div>
                      <span>Secure payment gateway</span>
                    </li>
                  </ul>
                </Card.Content>
              </div>

              <form action="/api/subscription" method="POST">
                <input type="hidden" name="plan_id" value={plan.name} />
                <Card.Footer className="p-6 pt-0 w-full">
                  <Button
                    type="submit"
                    className={`w-full font-bold rounded-xl h-12 text-sm transition-all ${plan.btnClass}`}
                  >
                    {plan.btnText}
                  </Button>
                </Card.Footer>
              </form>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
