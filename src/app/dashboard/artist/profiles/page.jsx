import { getUserSession } from "@/lib/core/session";
import { Button, Card, Avatar } from "@heroui/react";

import { FiCamera } from "react-icons/fi";

const ArtistProfilePage = async () => {
  const { user } = await getUserSession();

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-wide text-white">
          Profile Management
        </h1>
        <p className="text-sm text-slate-400">
          Update your personal account settings securely
        </p>
      </div>

      <Card className="bg-[#1a163a]/40 border border-white/5 rounded-2xl p-5">
        <Card.Header className="bg-transparent p-0 border-b border-white/5 pb-3">
          <Card.Title className="text-lg font-semibold text-white">
            Personal Information
          </Card.Title>
        </Card.Header>

        <Card.Content className="p-0 flex flex-col gap-6 mt-6">
          <div className="flex items-center gap-5 bg-[#131129]/40 p-4 rounded-xl border border-white/[0.03]">
            <div className="relative group">
              <Avatar className="w-20 h-20 text-large border-2 border-[#6f4ff2]/50">
                <Avatar.Image
                  referrerPolicy="no-referrer"
                  src={user?.image}
                  name={user?.name?.charAt(0)}
                  className="w-20 h-20 text-large border-2 border-[#6f4ff2]/50"
                />
                <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
              </Avatar>
              <label className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border border-[#6f4ff2]">
                <FiCamera className="text-white text-xl" />
                <input
                  type="file"
                  accept="image/*"
                  // onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-white">
                Profile Picture
              </span>
              <p className="text-xs text-slate-400">
                PNG, JPG or WEBP. Max 2MB.
              </p>
              <label className="text-xs text-[#6f4ff2] font-semibold hover:underline cursor-pointer w-fit mt-1">
                Upload New Image
                <input
                  type="file"
                  accept="image/*"
                  // onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* ইনফরমেশন গ্রিড */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-300">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Pial"
                className="bg-[#131129] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#6f4ff2] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="pial@example.com"
                disabled
                className="bg-[#131129]/50 border border-white/5 text-slate-500 rounded-xl px-4 py-3 text-sm cursor-not-allowed"
              />
            </div>
          </div>

          <Button className="bg-[#6f4ff2] hover:bg-[#5b3ed4] text-white font-semibold rounded-xl w-fit px-6 shadow-md shadow-[#6f4ff2]/20">
            Save Changes
          </Button>
        </Card.Content>
      </Card>

      <Card className="bg-[#1a163a]/40 border border-white/5 rounded-2xl p-5">
        <Card.Header className="bg-transparent p-0 border-b border-white/5 pb-3">
          <Card.Title className="text-lg font-semibold text-white">
            Security Settings
          </Card.Title>
        </Card.Header>

        <Card.Content className="p-0 flex flex-col gap-5 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-300">
                Current Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="bg-[#131129] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#6f4ff2] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-300">
                New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="bg-[#131129] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#6f4ff2] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-300">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="bg-[#131129] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#6f4ff2] transition-colors"
              />
            </div>
          </div>

          <Button className="bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl w-fit px-6">
            Update Password
          </Button>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ArtistProfilePage;
