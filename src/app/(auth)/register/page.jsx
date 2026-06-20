"use client";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
  Select,
  ListBox,
} from "@heroui/react";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import ArtImg from "@/assets/art.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!user.role) {
      toast.error("Please select a role before registering.");
      return;
    }

    const { data, error } = await authClient.signUp.email({
      ...user,
      plan: "free",
    });

    if (data) {
      toast("Registration successful!", {
        style: {
          color: "#00c950",
        },
      });
      router.push("/signin");
      router.refresh();
    }
  };

  const inputStyle = `rounded-lg bg-[#131129] border border-white/10 text-white w-full shadow-none mt-1 focus:border-[#6f4ff2] focus:ring-0 focus:outline-none transition-colors autofill:shadow-[0_0_0_30px_#131129_inset] autofill:text-white [-webkit-text-fill-color:white]`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className="py-10 px-4 md:px-0 text-white min-h-screen flex items-center justify-center">
        <Form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-[#1c1a36] shadow-2xl flex border border-white/5 p-8 w-full max-w-lg mx-auto flex-col gap-5"
        >
          <header className="text-center">
            <Image
              src={ArtImg}
              alt="ArtImg"
              width={50}
              height={50}
              className="mx-auto my-2 border border-white/10 bg-[#131129] rounded-lg p-1.5"
            />
            <h2 className="text-2xl font-bold tracking-tight mt-3">
              Create an ArtHub account
            </h2>
          </header>

          {/* Full Name Input */}
          <TextField isRequired name="name" type="text">
            <Label className="text-slate-200 text-sm font-medium">
              Full Name
            </Label>
            <Input className={inputStyle} placeholder="Enter your full name" />
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          {/* Photo URL Input */}
          <TextField isRequired name="image" type="url">
            <Label className="text-slate-200 text-sm font-medium">
              Photo URL
            </Label>
            <Input className={inputStyle} placeholder="https://" />
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          {/* Unique Email Input */}
          <TextField isRequired name="email" type="email">
            <Label className="text-slate-200 text-sm font-medium">
              Email Address
            </Label>
            <Input className={inputStyle} placeholder="john@example.com" />
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          {/* Select Component */}
          <div className="flex flex-col gap-1.5">
            <Select name="role" isRequired className="w-full">
              <Label className="text-slate-200 text-sm font-medium mb-1 inline-block">
                Join As
              </Label>
              <Select.Trigger className="rounded-lg bg-[#131129] border border-white/10 text-white w-full flex items-center justify-between p-2.5 text-sm focus:border-[#6f4ff2] outline-none transition-colors">
                <Select.Value
                  className="text-slate-300"
                  placeholder="Select your role"
                />
                <Select.Indicator className="text-slate-400 text-xs" />
              </Select.Trigger>

              <Select.Popover className="bg-[#1c1a36] border border-white/10 rounded-lg shadow-xl mt-1 overflow-hidden z-50">
                <ListBox className="p-1 text-white">
                  <ListBox.Item
                    id="buyer"
                    textValue="Buyer"
                    className="p-2 text-sm rounded-md cursor-pointer text-white data-[focused=true]:bg-[#6f4ff2] data-[selected=true]:bg-[#6f4ff2] data-[focused=true]:text-white outline-none flex items-center justify-between transition-colors"
                  >
                    <span className="text-white">Buyer</span>
                    <ListBox.ItemIndicator className="text-white text-xs" />
                  </ListBox.Item>

                  <ListBox.Item
                    id="artist"
                    textValue="Artist"
                    className="p-2 text-sm rounded-md cursor-pointer text-white data-[focused=true]:bg-[#6f4ff2] data-[selected=true]:bg-[#6f4ff2] data-[focused=true]:text-white outline-none flex items-center justify-between transition-colors"
                  >
                    <span className="text-white">Artist</span>
                    <ListBox.ItemIndicator className="text-white text-xs" />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Password Input */}
          <TextField
            isRequired
            minLength={6}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 6)
                return "Password must be at least 6 characters";
              if (!/[A-Z]/.test(value))
                return "Include at least one uppercase letter";
              if (!/[a-z]/.test(value))
                return "Include at least one lowercase letter";
              return null;
            }}
          >
            <Label className="text-slate-200 text-sm font-medium">
              Password
            </Label>
            <Input className={inputStyle} placeholder="Create a password" />
            <Description className="text-xs text-slate-400 mt-1">
              At least 6 characters with 1 uppercase & 1 lowercase letter.
            </Description>
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          {/* Confirm Password Input */}
          <TextField isRequired name="confirmPassword" type="password">
            <Label className="text-slate-200 text-sm font-medium">
              Confirm Password
            </Label>
            <Input className={inputStyle} placeholder="confirm password" />
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          {/* Submission & Button Area */}
          <div className="mt-2 flex flex-col gap-3">
            <Button
              type="submit"
              className="cursor-pointer w-full rounded-lg bg-[#6f4ff2] hover:bg-[#5b3ed4] text-white font-semibold py-2.5 transition-colors shadow-md"
            >
              Register Account
            </Button>

            <div className="flex items-center justify-between gap-2 py-1">
              <Separator className="flex-1 bg-white/10" />
              <p className="text-xs text-slate-400 font-medium">OR</p>
              <Separator className="flex-1 bg-white/10" />
            </div>

            <Button
              type="button"
              className="w-full rounded-lg bg-white text-neutral-900 border border-transparent font-medium py-2.5 transition-colors hover:bg-slate-100 flex items-center justify-center gap-2 shadow-sm"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </Button>
          </div>

          <Separator className="bg-white/10" />

          <footer className="text-center text-sm text-slate-300">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-[#6f4ff2] hover:text-purple-300 font-medium hover:underline ml-1"
            >
              Sign In
            </Link>
          </footer>
        </Form>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
