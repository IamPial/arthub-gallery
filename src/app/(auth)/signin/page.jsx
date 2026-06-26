"use client";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";
import { motion } from "motion/react";
import Image from "next/image";
import ArtImg from "@/assets/art.png";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const LoginPage = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });
    const role = data.user?.role;

    if (data) {
      toast("Logged in Successfully", {
        style: {
          color: "#00c950",
        },
      });

      if (role === "artist") {
        router.push("/dashboard/artist");
      } else if (role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/");
      }

      router.refresh();
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
    toast("Signed in with google", {
      style: {
        color: "#00c950",
      },
    });
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
          className="rounded-2xl bg-[#1c1a36] shadow-2xl flex border border-white/5 p-8 w-full max-w-md mx-auto flex-col gap-5"
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
              Login to ArtHub
            </h2>
            <p className="text-purple-300 mt-1 text-sm">Welcome back</p>
          </header>

          {/* Email Input */}
          <TextField isRequired name="email" type="email">
            <Label className="text-slate-200 text-sm font-medium">Email</Label>
            <Input className={inputStyle} placeholder="john@example.com" />
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          {/* Password Input */}
          <TextField isRequired minLength={6} name="password" type="password">
            <Label className="text-slate-200 text-sm font-medium">
              Password
            </Label>
            <Input className={inputStyle} placeholder="Enter your password" />
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          {/* Buttons Section */}
          <div className="mt-2 flex flex-col gap-3">
            <Button
              type="submit"
              className="cursor-pointer w-full rounded-lg bg-[#6f4ff2] hover:bg-[#5b3ed4] text-white font-semibold py-2.5 transition-colors shadow-md"
            >
              Login
            </Button>

            <div className="flex items-center justify-between gap-2 py-1">
              <Separator className="flex-1 bg-white/10" />
              <p className="text-xs text-slate-400 font-medium">OR</p>
              <Separator className="flex-1 bg-white/10" />
            </div>

            <Button
              onClick={handleGoogleSignIn}
              className="w-full rounded-lg bg-white text-neutral-900 border border-transparent font-medium py-2.5 transition-colors hover:bg-slate-100 flex items-center justify-center gap-2 shadow-sm"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </Button>
          </div>

          <Separator className="bg-white/10" />

          <footer className="text-center text-sm text-slate-300">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[#6f4ff2] hover:text-purple-300 font-medium hover:underline ml-1"
            >
              Register
            </Link>
          </footer>
        </Form>
      </div>
    </motion.div>
  );
};

export default LoginPage;
