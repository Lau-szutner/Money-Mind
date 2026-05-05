const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchCommunities = async () => {
  try {
    const res = await fetch(`${apiUrl}/communities`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
