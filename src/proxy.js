import { NextResponse } from "next/server";
import { getUserSession } from "./lib/core/session";

export async function proxy(request) {
  const { data } = await getUserSession();
  const session = data?.session;

  if (session?.user?.role == "buyer" && session?.user?.plan === "free") {
    return NextResponse.redirect(new URL("/pricing", request.url));
  }

  // if (!session) {
  //   return NextResponse.redirect(new URL("/signin", request.url));
  // }
}

export const config = {
  matcher: "/dashboard/buyer",
};
