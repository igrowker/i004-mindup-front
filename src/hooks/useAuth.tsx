import { useNavigate } from "react-router-dom";
import { useUserStore } from "../context/userStore";
import { useEffect } from "react";
import { decodeToken, isTokenExpired } from "../utils/tokenUtils"; // Asegúrate de que estas funciones existan y funcionen correctamente.

const useAuthorization = () => {
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !isTokenExpired(token)) {
      try {
        // Decodifica el token y extrae los datos del usuario
        const decoded = decodeToken(token);

        // Verifica que los datos mínimos necesarios estén presentes
        if (decoded && decoded.userId && decoded.sub) {
          setUser({
            id: decoded.userId,
            email: decoded.sub,
            role: decoded.role,
            name: decoded.name,
            image: decoded.image,
          });
        } else {
          console.error("Token inválido: faltan datos del usuario.");
          setUser(null);
          navigate("/");
        }
      } catch (error) {
        console.error("Error decodificando el token:", error);
        setUser(null);
        navigate("/");
      }
    } else {
      // Si el token no es válido o ha expirado
      setUser(null);
      if (window.location.pathname !== "/") {
        navigate("/");
      }
    }
  }, [setUser, navigate]);
};

export default useAuthorization;
