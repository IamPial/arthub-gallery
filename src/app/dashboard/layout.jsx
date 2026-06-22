import DashBoardProfiles from "@/components/dashboard/DashBoardProfiles";
import DashBoardSideBar from "@/components/dashboard/DashBoardSideBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-[#131129]">
      {/* sidebar */}
      <DashBoardSideBar />
      {/* <div className="border border-red-500 flex-1  overflow-y-auto">
        Navbar
      </div> */}
      {/* কন্টেন্ট এরিয়া */}
      {/* <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto w-full">
        {children}
      </main> */}

      <div className="flex-1 overflow-y-auto">
        {/* navbar */}
        <DashBoardProfiles />
        <main className="p-5">{children}</main>
      </div>
    </div>
  );
}
