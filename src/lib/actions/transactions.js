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
