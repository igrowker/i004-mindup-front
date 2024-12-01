import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../context/userStore';
import { useEffect } from 'react';
import { decodeToken, isTokenExpired } from '../utils/tokenUtils';

const useAuthorization = () => {
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token && !isTokenExpired(token)) {
      const decoded = decodeToken(token);
      setUser({
        id: decoded.userId,
        email: decoded.sub,
        role: decoded.role,
      });
    } else {
      setUser(null);
      if (window.location.pathname !== '/') {
        navigate('/');
      }
    }
  }, [setUser, navigate]);
};

export default useAuthorization;
