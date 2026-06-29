"use client";
import {
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Sector,
  Legend,
} from "recharts";
import { Card } from "@heroui/react";

const COLORS = ["#6f4ff2", "#06b6d4", "#f59e0b", "#ec4899"];

const dummyCategoryPie = [
  { name: "Cyberpunk", value: 420 },
  { name: "Abstract", value: 340 },
  { name: "Minimalist", value: 210 },
  { name: "Oil Painting", value: 120 },
];

const CategoryChartsCard = () => {
  return (
    <Card className="bg-[#1a163a]/40 border border-white/5 rounded-2xl p-4 shadow-none backdrop-blur-md">
      <Card.Header className="bg-transparent pb-4">
        <Card.Title className="text-base font-semibold text-white">
          Artworks by Category
        </Card.Title>
        <Card.Description className="text-xs text-slate-500">
          Distribution across creative genres
        </Card.Description>
      </Card.Header>
      <Card.Content className="p-0">
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dummyCategoryPie}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={5}
                dataKey="value"
                shape={(props) => {
                  const { index, ...rest } = props;
                  return (
                    <Sector
                      {...rest}
                      fill={COLORS[index % COLORS.length]}
                      stroke="rgba(26, 22, 58, 0.5)"
                      strokeWidth={2}
                    />
                  );
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#131129",
                  borderColor: "rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card.Content>
      <Card.Footer />
    </Card>
  );
};

export default CategoryChartsCard;
