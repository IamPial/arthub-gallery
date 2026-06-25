"use server";

import { getTokenServer } from "../getToken";

const baseURl = process.env.NEXT_PUBLIC_SERVER_URL;

export const addArtWorks = async (artWorks) => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURl}/api/artworks`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(artWorks),
  });

  const data = await res.json();
  return data;
};
