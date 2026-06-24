"use server";

const baseURl = process.env.NEXT_PUBLIC_SERVER_URL;

export const addArtWorks = async (artWorks) => {
  const res = await fetch(`${baseURl}/api/artworks`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(artWorks),
  });

  const data = await res.json();
  return data;
};
