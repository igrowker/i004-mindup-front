import { Navigate } from "react-router-dom";
import { useUserStore } from "../context/userStore";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useUserStore(); // Accedemos al usuario actual.
  console.log(user);
  // Si no hay usuario, redirige al login.
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Si hay usuario, renderiza el contenido protegido.
  return children;
};

export default ProtectedRoute;
