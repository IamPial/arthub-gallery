"use server";

import { getTokenServer } from "../getToken";

const baseURl = process.env.NEXT_PUBLIC_SERVER_URL;

//create artworks
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

//edit artworks
export const updateArtWorks = async (id, updateData) => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURl}/api/artworks/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });
  const data = await res.json();
  return data;
};

//delete artworks
export const deleteArtWorks = async (id) => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURl}/api/artworks/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};
