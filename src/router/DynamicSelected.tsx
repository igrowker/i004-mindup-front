import { Navigate } from "react-router-dom";
import { useUserStore } from "../context/userStore";
import SelectedProfessional from "../pages/SelectedProfessional";

const SelectedRoute = () => {
  const { user } = useUserStore(); // Accedemos al usuario actual.

  // Si no hay usuario, redirige al login.
  if (user.rol != "Paciente") {
    return <Navigate to="/" replace />;
  } else {
    return <SelectedProfessional />;
  }
};

export default SelectedRoute;
