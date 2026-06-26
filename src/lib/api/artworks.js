import { getTokenServer } from "../getToken";

const baseURl = process.env.NEXT_PUBLIC_SERVER_URL;

//get all artworks
export const getAllArtworks = async (obj = {}) => {
  const { search, minPrice, maxPrice, category } = obj;
  const searchUrl = new URL(`${baseURl}/api/all-artworks`);

  if (search) searchUrl.searchParams.set("search", search);
  if (minPrice) searchUrl.searchParams.set("minPrice", minPrice);
  if (maxPrice) searchUrl.searchParams.set("maxPrice", maxPrice);
  if (category) searchUrl.searchParams.set("category", category);

  const res = await fetch(searchUrl.toString());
  const data = await res.json();
  return data;
};

//get artworks by artist
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
