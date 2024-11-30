import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { useUserStore } from "./context/userStore";
import { decodeToken, isTokenExpired } from "./utils/tokenUtils";

function App() {
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !isTokenExpired(token)) {
      // Si hay un token
      const decoded = decodeToken(token);
      setUser({
        id: decoded.userId,
        email: decoded.sub,
        role: decoded.role,
      });
    } else {
      // Si no hay token limpiar estado global
      setUser(null);
      if (window.location.pathname !== "/") {
        navigate("/");
      }
    }
  }, [setUser, navigate]);

  return (
    <div>
      <Outlet />
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
