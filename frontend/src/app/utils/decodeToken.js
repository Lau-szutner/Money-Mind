// utils/decodeToken.js
import Cookies from 'js-cookie';

export default function decodeToken() {
  const token = Cookies.get('authToken');
  if (!token) return null;

  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return {
      id: decodedToken.id,
      token,
      loggedIn: true,
    };
  } catch (error) {
    console.error('Error decoding token', error);
    return null;
  }
}
