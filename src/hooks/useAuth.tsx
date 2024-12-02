import { useNavigate } from "react-router-dom";
import { useUserStore } from "../context/userStore";
import { useEffect } from "react";
import { decodeToken, isTokenExpired } from "../utils/tokenUtils";

const useAuthorization = () => {
  const { setUser, user } = useUserStore();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_COREURL;

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUserData = async (userId: string) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token no encontrado");

        const response = await fetch(
          `${apiUrl}/user/profile/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Token en el encabezado
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          setUser({
            id: userData.id,
            email: userData.email,
            role: userData.role,
            professional: userData.professional,
            name: userData.name,
            image: userData.image,
          });
        } else {
          console.error(
            "Error al obtener los datos del usuario:",
            response.statusText
          );
          setUser(null);
          navigate("/");
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        setUser(null);
        navigate("/");
      }
    };

    if (token && !isTokenExpired(token)) {
      const decoded = decodeToken(token);
      fetchUserData(decoded.userId);
    } else {
      setUser(null);
      if (window.location.pathname !== "/") {
        navigate("/");
      }
    }
  }, [setUser, navigate]);
};

export default useAuthorization;
