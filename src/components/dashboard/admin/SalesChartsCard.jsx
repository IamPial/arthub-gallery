"use client";

import { Card } from "@heroui/react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SalesChartsCard = ({ salesData }) => {
  return (
    <Card className="lg:col-span-2 bg-[#1a163a]/40 border border-white/5 rounded-2xl p-4 shadow-none backdrop-blur-md">
      <Card.Header className="bg-transparent pb-4">
        <Card.Title className="text-base font-semibold text-white">
          Sales Revenue Performance
        </Card.Title>
        <Card.Description className="text-xs text-slate-500">
          Monthly overview of subscriptions & purchases
        </Card.Description>
      </Card.Header>
      <Card.Content className="p-0">
        <div className="w-full h-[300px] relative px-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={salesData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6f4ff2" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6f4ff2" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="type"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
              />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#131129",
                  borderColor: "rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#6f4ff2"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSales)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card.Content>
      <Card.Footer />
    </Card>
  );
};

export default SalesChartsCard;
