const baseURl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getArtistById = async (id) => {
  const res = await fetch(`${baseURl}/api/artist-profiles/${id}`);
  const data = await res.json();
  return data;
};
