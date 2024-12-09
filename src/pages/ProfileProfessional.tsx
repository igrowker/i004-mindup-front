import CustomButton from "../components/shared/CustomButton";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStudies from "../components/profile/ProfileStudies";
import ProfileHonorary from "../components/profile/ProfileHonorary";
import ProfileInformation from "../components/profile/ProfileInformation";
import ProfileVideo from "../components/profile/ProfileVideo";
import ProfileAttention from "../components/profile/ProfileAttention";
import Header from "../components/header/Header";
import { useEffect, useState } from "react";
import { userProfile } from "../api/userProfile";
import { useUserStore } from "../context/userStore";
import { useNavigate } from "react-router-dom";

interface Profile {
  id: string;
  name: string;
  age: number;
  gender: string;
  specialty: string;
  tuition: string;
  location: string;
  birth: string;
  information: string;
  image: string;
  video: string;
  chosenPsychologist: string;
}

function ProfileProfessional() {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfileData, setUserProfileData] = useState<Profile | null>(null);
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return;
    }
    setIsLoading(true);

    const fetchProfiles = async () => {
      try {
        const profileData = (await userProfile(user.id)) as Profile;
        if (profileData) {
          setUserProfileData(profileData);
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

  if (!userProfileData) {
    navigate("/home");
    return <div>No se encontró ese perfil.</div>;
  }

  const professional = {
    imagen: "/Imágenes/trinidad.png",
    nombre: "Lic.Trinidad García",
    especialidad: "Clínica",
    frase: {
      autor: "Jacques Lacan",
      texto:
        "Somos seres con la capacidad de desear pero siempre incompletos, de ahí surge nuestro caminar",
    },
  };

  return (
    <main className="w-full min-w-mobile flex flex-col items-center justify-center bg-background">
      <Header />
      <ProfileHeader
        imagen={userProfileData.image}
        nombre={userProfileData.name}
        especialidad={userProfileData.specialty}
      />
      <hr className="w-[290px] my-4 -mx-4" />
      <ProfileStudies />
      <hr className="w-[290px] my-4 -mx-4" />
      <ProfileHonorary />
      <ProfileAttention />
      <hr className="w-[290px] my-4 -mx-4" />
      <ProfileInformation
        fraseAutor={professional.frase.autor}
        fraseTexto={professional.frase.texto}
      />
      <hr className="w-[290px] my-4 -mx-4" />
      <ProfileVideo />
      <hr className="w-[290px] my-4 -mx-4" />
      <article className="my-4 mb-6">
        <CustomButton title="Guardar" appearance={true} type="submit" />
      </article>
    </main>
  );
}

export default ProfileProfessional;
