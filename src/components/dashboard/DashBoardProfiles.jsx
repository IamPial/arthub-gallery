import { getUserSession } from "@/lib/core/session";
import { Avatar } from "@heroui/react";

const DashBoardProfiles = async () => {
  const { user } = await getUserSession();

  return (
    <div className="w-full border-b border-white/5 p-3 flex items-center justify-end">
      <div className="flex items-center gap-3">
        <div className="flex flex-col text-right">
          <span className="text-sm font-semibold text-white tracking-wide">
            {user?.name}
          </span>
          <span className="text-[10px] font-bold text-slate-400 tracking-widest">
            {user?.role?.toUpperCase()}
          </span>
        </div>
        <Avatar>
          <Avatar.Image
            referrerPolicy="no-referrer"
            src={user?.image}
            name={user?.name?.charAt(0)}
            className="w-10 h-10 border border-white/10"
          />
          <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
        </Avatar>{" "}
      </div>
    </div>
  );
};

export default DashBoardProfiles;
