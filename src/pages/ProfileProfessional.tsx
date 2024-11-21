import { GoArrowLeft } from "react-icons/go";
import CustomButton from "../components/shared/CustomButton";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStudies from "../components/profile/ProfileStudies";
import ProfileHonorary from "../components/profile/ProfileHonorary";
import ProfileInformation from "../components/profile/ProfileInformation";
import ProfileVideo from "../components/profile/ProfileVideo";

function ProfileProfessional() {

  const professional = {
    imagen: "/Imágenes/trinidad.png",
    nombre: "Lic.Trinidad García",
    especialidad: "Clínica",
    frase: {
      autor: "Jacques Lacan",
      texto: "Somos seres con la capacidad de desear pero siempre incompletos, de ahí surge nuestro caminar"
    }
  }

  return (
    <main className="w-full min-w-mobile flex flex-col items-center justify-center bg-background">
      <header className="bg-secondary w-full pl-2 py-5 text-white flex items-center">
        <button className="p-1">
          <GoArrowLeft />
        </button>
        <span>Perfil</span>
      </header>

      <ProfileHeader
        imagen={professional.imagen}
        nombre={professional.nombre}
        especialidad={professional.especialidad}
      />
      <ProfileStudies />
      <ProfileHonorary />
      <ProfileInformation
        fraseAutor={professional.frase.autor}
        fraseTexto={professional.frase.texto}
      />
      <ProfileVideo />

      <article className="my-4 mb-6">
        <CustomButton
          title="Guardar"
          appearance={true}
          type="submit" />
      </article>
    </main>
  );
}

export default ProfileProfessional;
