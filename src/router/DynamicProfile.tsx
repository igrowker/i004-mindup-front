import { useUserStore } from "../context/userStore";
import ProfilePacient from "../pages/ProfilePacient";
import ProfileProfessional from "../pages/ProfileProfessional";

const DynamicProfile = () => {
  const { user } = useUserStore(); // Obtenemos la información del usuario.

  if (!user) {
    return <div>Error: No user found</div>; // Manejo de casos en los que no hay usuario.
  }

  return user.role === "PATIENT" ? <ProfilePacient /> : <ProfileProfessional />;
};

export default DynamicProfile;
