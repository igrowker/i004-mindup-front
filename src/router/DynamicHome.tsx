import { useUserStore } from "../context/userStore";
import HomePacient from "../pages/HomePacient";
import HomePsychologist from "../pages/HomePsychologist";

const DynamicHome = () => {
  const { user } = useUserStore(); // Obtenemos la información del usuario.

  if (!user) {
    return <div>Error: No user found</div>; // Manejo de errores si no hay usuario.
  }

  // Retorna el componente adecuado según el rol del usuario.
  return user.rol === "Paciente" ? <HomePacient /> : <HomePsychologist />;
};

export default DynamicHome;
