import { Navigate } from "react-router-dom";
import { useUserStore } from "../context/userStore";
import HomePacient from "../pages/HomePacient";
import HomePsychologist from "../pages/HomePsychologist";

const DynamicHome = () => {
  const { user } = useUserStore(); // Obtenemos la información del usuario.

  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Retorna el componente adecuado según el rol del usuario.
  return user.role === "PATIENT" ? <HomePacient /> : <HomePsychologist />;
};

export default DynamicHome;
