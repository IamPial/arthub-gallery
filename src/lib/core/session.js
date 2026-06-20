import { headers } from "next/headers";
import { auth } from "../auth";

export const getUserSession = async () => {
  const user = await auth.api.getSession({
    headers: await headers(),
  });
  return user || null;
};
