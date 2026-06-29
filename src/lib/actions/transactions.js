"use server";

import { getTokenServer } from "../getToken";

const baseURl = process.env.NEXT_PUBLIC_SERVER_URL;

//create artworks
export const transactions = async (newData) => {
  const res = await fetch(`${baseURl}/api/transactions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newData),
  });

  const data = await res.json();
  return data;
};

//delete transactions
export const deleteTransactions = async (id) => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURl}/api/transactions/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};
