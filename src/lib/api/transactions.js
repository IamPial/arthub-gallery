import { getTokenServer } from "../getToken";

const baseURl = process.env.NEXT_PUBLIC_SERVER_URL;

//get artworks by artist
export const getTransactions = async () => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURl}/api/transactions`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};
