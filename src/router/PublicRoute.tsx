import { Navigate } from "react-router-dom";
import { useUserStore } from "../context/userStore";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user, registering } = useUserStore();

  if (user) {
    if (registering) {
      // Redirección condicional basada en el flujo de registro
      return (
        <Navigate
          to={user.role === "PATIENT" ? "/questionnaire" : "/onboard"}
          replace
        />
      );
    }
    // Redirección a home si no está en proceso de registro
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicRoute;
