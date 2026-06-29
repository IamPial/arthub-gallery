import CategoryChartsCard from "@/components/dashboard/admin/CategoryChartsCard";
import SalesChartsCard from "@/components/dashboard/admin/SalesChartsCard";
import { getAdminAllTransactions } from "@/lib/api/adminTransactions";
import { getTransactions } from "@/lib/api/transactions";
import { getAllUsers } from "@/lib/api/users";
import { Card } from "@heroui/react";

import {
  FiUsers,
  FiFeather,
  FiShoppingBag,
  FiDollarSign,
} from "react-icons/fi";

// const COLORS = ["#6f4ff2", "#06b6d4", "#f59e0b", "#ec4899"];

// const dummyStats = {
//   totalUsers: 1420,
//   totalArtists: 340,
//   artworksSold: 890,
//   totalRevenue: "45250.00",
// };

const AdminDashBoardPage = async () => {
  const allUsers = await getAllUsers();
  const soldArtworks = await getTransactions("admin");
  const allData = await getAdminAllTransactions();

  const allRevenue = allData.reduce((acc, cur) => acc + Number(cur?.amount), 0);
  const filterUsers = allUsers.filter((user) => user?.role == "buyer");
  const filterArtist = allUsers.filter((artist) => artist?.role == "artist");

  const Stats = {
    totalUsers: filterUsers.length,
    totalArtists: filterArtist.length,
    artworksSold: soldArtworks.length,
    totalRevenue: allRevenue,
  };
  console.log(Stats);

  const cardData = [
    {
      title: "Total Users",
      value: Stats.totalUsers,
      desc: "Registered accounts",
      icon: <FiUsers size={22} />,
      color: "text-blue-400",
    },
    {
      title: "Total Artists",
      value: Stats.totalArtists,
      desc: "Verified creators",
      icon: <FiFeather size={22} />,
      color: "text-purple-400",
    },
    {
      title: "Artworks Sold",
      value: Stats.artworksSold,
      desc: "Successful sales",
      icon: <FiShoppingBag size={22} />,
      color: "text-orange-400",
    },
    {
      title: "Total Revenue",
      value: `$${Stats.totalRevenue.toFixed(2)}`,
      desc: "Gross platform earnings",
      icon: <FiDollarSign size={22} />,
      color: "text-emerald-400",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 🎯 Analytics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {cardData.map((card, i) => (
          <Card
            key={i}
            className="bg-[#1a163a]/40 border border-white/5 rounded-2xl p-2 shadow-none backdrop-blur-md"
          >
            <Card.Header className="bg-transparent flex flex-row items-center justify-between pb-2">
              <div className="flex flex-col gap-0.5">
                <Card.Title className="text-sm font-semibold text-slate-400 tracking-wide">
                  {card.title}
                </Card.Title>
                <Card.Description className="text-xs text-slate-500">
                  {card.desc}
                </Card.Description>
              </div>
              <div
                className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${card.color}`}
              >
                {card.icon}
              </div>
            </Card.Header>
            <Card.Content className="pt-2 pb-4 px-3">
              <span className="text-2xl font-black text-white tracking-wide">
                {card.value}
              </span>
            </Card.Content>
            <Card.Footer />
          </Card>
        ))}
      </div>

      {/* 📈 Charts Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Sales Performance Card */}
        <SalesChartsCard salesData={allData} />
        {/* Categories Card */}
        <CategoryChartsCard categoryData={soldArtworks} />
      </div>
    </div>
  );
};

export default AdminDashBoardPage;
