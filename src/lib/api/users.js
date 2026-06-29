import { getTokenServer } from "../getToken";

const baseURl = process.env.NEXT_PUBLIC_SERVER_URL;

//get  all users
export const getAllUsers = async () => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURl}/api/users`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};
