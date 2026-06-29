import { getTokenServer } from "../getToken";

const baseURl = process.env.NEXT_PUBLIC_SERVER_URL;

//get admin all transactions
export const getAdminAllTransactions = async () => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURl}/api/admin/transactions`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};
