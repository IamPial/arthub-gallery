import { getTokenServer } from "../getToken";

const baseURl = process.env.NEXT_PUBLIC_SERVER_URL;

//get all transactions
export const getTransactions = async (role = "buyer") => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURl}/api/transactions?role=${role}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

//get transactions details
export const getTransactionsDetails = async (id) => {
  const res = await fetch(`${baseURl}/api/transactions/${id}`);
  const data = await res.json();
  return data;
};
