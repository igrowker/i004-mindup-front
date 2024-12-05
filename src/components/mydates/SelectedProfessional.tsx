import { useEffect, useState } from "react";
import { useUserStore } from "../../context/userStore";
import { userProfile } from "../../api/userProfile";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

interface PacientProfile {
  id: string;
  name: string;
  chosenPsychologist: string;
}

interface ProfessionalProfile {
  id: string;
  name: string;
  specialty: string;
  image: string;
}

function SelectedProfessional() {
  const { user } = useUserStore();
  const [selectedProfessional, setSelectedProfessional] =
    useState<ProfessionalProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return;
    }

    setIsLoading(true);

    const fetchProfiles = async () => {
      try {
        // Obtén el perfil del paciente
        const pacientProfileData = (await userProfile(
          user.id
        )) as PacientProfile;

        // Si hay un psicólogo seleccionado, obtén su perfil
        if (pacientProfileData?.chosenPsychologist) {
          const professionalProfile = (await userProfile(
            pacientProfileData.chosenPsychologist
          )) as ProfessionalProfile;
          setSelectedProfessional(professionalProfile);
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [user]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!selectedProfessional) {
    navigate("/questionnaire");
    return <div>No se encontró un profesional seleccionado.</div>;
  }

  return (
    <div className="w-[342px] shadow rounded-lg border flex p-2 px-4 items-center border-[#E5E7EB] gap-4">
      {selectedProfessional.image ? (
        <img
          src={selectedProfessional.image}
          alt={`Foto del profesional ${selectedProfessional.name}`}
          className="size-10 bg-[#989898] rounded-full"
        />
      ) : (
        <FaUser className="size-10 bg-[#989898] fill-zinc-600 rounded-full" />
      )}

      <div className="flex flex-col justify-center">
        <h2 className="text-lg font-bold">{selectedProfessional.name}</h2>
        <h3 className="text-[#4A4A4A]">
          {selectedProfessional.specialty || "Psicólogo"}
        </h3>
      </div>
    </div>
  );
}

export default SelectedProfessional;
