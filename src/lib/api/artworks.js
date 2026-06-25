import { getTokenServer } from "../getToken";

const baseURl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getArtworks = async () => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURl}/api/artworks`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};
