import { getTokenServer } from "../getToken";

const baseURl = process.env.NEXT_PUBLIC_SERVER_URL;

//upgrade plans
export const checkPlans = async () => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURl}/api/plans`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};
