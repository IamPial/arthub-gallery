

const baseURl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getArtworks = async () => {
  const res = await fetch(`${baseURl}/api/artworks`);
  const data = await res.json();
  return data;
};
