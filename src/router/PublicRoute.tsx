import { Navigate } from "react-router-dom";
import { useUserStore } from "../context/userStore";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useUserStore(); // Obtenemos el usuario del contexto.

  // Si el usuario está autenticado, redirige a "/home".
  if (user) {
    return <Navigate to="/home" replace />;
  }

  // Si no está autenticado, permite acceder al contenido público.
  return children;
};

export default PublicRoute;
