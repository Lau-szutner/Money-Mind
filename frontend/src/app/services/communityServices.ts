const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import Cookies from 'js-cookie';

export const fetchCommunities = async () => {
  try {
    const token = Cookies.get('authToken');

    const res = await fetch(`${apiUrl}/communities/byUser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
