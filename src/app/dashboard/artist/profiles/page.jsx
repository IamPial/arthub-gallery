"use client";

import { useState } from "react";
import {
  Form,
  Card,
  Avatar,
  Input,
  Button,
  Label,
  InputGroup,
} from "@heroui/react";
import { FiCamera, FiEye, FiEyeOff } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { imgUpload } from "@/lib/imgUpload";
import { toast } from "sonner";

const ArtistProfilePage = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { data } = authClient.useSession();
  const user = data?.user;

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    if (
      userData.newPassword &&
      userData.newPassword !== userData.confirmPassword
    ) {
      toast.error("New password and confirm password do not match!");
      return;
    }

    const updateData = {};

    if (userData.name && userData.name !== user?.name) {
      updateData.name = userData.name;
    }

    if (userData.image?.size > 0) {
      const image = await imgUpload(userData.image);
      updateData.image = image?.url;
    }

    if (userData.newPassword) {
      await authClient.changePassword({
        currentPassword: userData.currentPassword,
        newPassword: userData.newPassword,
        revokeOtherSessions: true,
      });
      toast.success("Password changes successfully");
    }

    if (Object.keys(updateData).length > 0) {
      await authClient.updateUser(updateData);
    }
  };
  const inputClassName =
    "bg-[#131129] border border-white/10 rounded-xl h-12 data-[hover=true:border-[#6f4ff2] group-data-[focus=true]:border-[#6f4ff2] group-data-[focus=true]:bg-[#131129] transition-colors text-white placeholder:text-slate-500 text-sm";

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold tracking-wide text-white">
          Profile Management
        </h1>
        <p className="text-sm text-slate-400">
          Update your personal account settings securely
        </p>
      </div>

      <Form
        onSubmit={handleOnSubmit}
        className="flex flex-col gap-8 max-w-3xl w-full"
      >
        <Card className="bg-[#1a163a]/40 border border-white/5 rounded-2xl p-5 w-full shadow-none">
          <Card.Header className="bg-transparent p-0 border-b border-white/5 pb-3">
            <Card.Title className="text-lg font-semibold text-white">
              Personal Information
            </Card.Title>
          </Card.Header>

          <Card.Content className="p-0 flex flex-col gap-6 mt-6">
            <div className="flex flex-col gap-3 bg-[#131129]/40 p-4 rounded-xl border border-white/[0.03]">
              <Label>Profile Picture</Label>

              <div className="flex items-center gap-5">
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
                  </label>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-xs text-slate-400">
                    PNG, JPG or WEBP. Max 2MB.
                  </p>
                  <label className="text-xs text-[#6f4ff2] font-semibold hover:underline cursor-pointer w-fit mt-1">
                    Upload New Image
                    <input type="file" name="image" className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <Label
                  required
                  className="text-xs font-semibold text-slate-300 mb-1"
                >
                  Full Name
                </Label>
                <Input
                  key={user?.name}
                  type="text"
                  name="name"
                  required
                  defaultValue={user?.name}
                  placeholder={user?.name}
                  className={inputClassName}
                />
              </div>

              <div className="flex flex-col">
                <Label className="text-xs font-semibold text-slate-300 mb-1">
                  Email Address
                </Label>
                <Input
                  key={user?.email}
                  type="email"
                  readOnly
                  defaultValue={user?.email}
                  placeholder={user?.email}
                  className={`bg-[#131129] border border-white/10 rounded-xl h-12 cursor-not-allowed data-[hover=true]:border-white/10 data-[focus=true]:border-white/10 data-[focus-within=true]:border-white/10 outline-none ring-0 focus:ring-0 focus:outline-none transition-colors text-white placeholder:text-slate-500 text-sm`}
                />
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card className="bg-[#1a163a]/40 border border-white/5 rounded-2xl p-5 w-full shadow-none">
          <Card.Header className="bg-transparent p-0 border-b border-white/5 pb-3">
            <Card.Title className="text-lg font-semibold text-white">
              Security Settings
            </Card.Title>
          </Card.Header>

          <Card.Content className="p-0 flex flex-col gap-5 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <Label className="text-xs font-semibold text-slate-300 mb-1">
                  Current Password
                </Label>
                <InputGroup className="bg-[#131129] border border-white/10 rounded-xl h-12">
                  <InputGroup.Input
                    type={showCurrentPassword ? "text" : "password"}
                    name="currentPassword"
                    placeholder="••••••••"
                    className="bg-transparent text-white placeholder:text-slate-500 text-sm h-full"
                  />
                  <InputGroup.Suffix>
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="text-slate-400 hover:text-white transition-colors px-3"
                    >
                      {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </InputGroup.Suffix>
                </InputGroup>
              </div>

              <div className="flex flex-col">
                <Label className="text-xs font-semibold text-slate-300 mb-1">
                  New Password
                </Label>
                <InputGroup className="bg-[#131129] border border-white/10 rounded-xl h-12">
                  <InputGroup.Input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="••••••••"
                    className="bg-transparent text-white placeholder:text-slate-500 text-sm h-full"
                  />
                  <InputGroup.Suffix>
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="text-slate-400 hover:text-white transition-colors px-3"
                    >
                      {showNewPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </InputGroup.Suffix>
                </InputGroup>
              </div>

              <div className="flex flex-col">
                <Label className="text-xs font-semibold text-slate-300 mb-1">
                  Confirm Password
                </Label>
                <InputGroup className="bg-[#131129] border border-white/10 rounded-xl h-12">
                  <InputGroup.Input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    className="bg-transparent text-white placeholder:text-slate-500 text-sm h-full"
                  />
                  <InputGroup.Suffix>
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="text-slate-400 hover:text-white transition-colors px-3"
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </InputGroup.Suffix>
                </InputGroup>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Button
          type="submit"
          className="bg-[#6f4ff2] hover:bg-[#5b3ed4] text-white font-semibold rounded-xl w-full md:w-fit px-12 py-6 shadow-md shadow-[#6f4ff2]/20 md:self-end"
        >
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default ArtistProfilePage;
