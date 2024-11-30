import CustomButton from "../components/shared/CustomButton";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStudies from "../components/profile/ProfileStudies";
import ProfileHonorary from "../components/profile/ProfileHonorary";
import ProfileInformation from "../components/profile/ProfileInformation";
import ProfileVideo from "../components/profile/ProfileVideo";
import ProfileAttention from "../components/profile/ProfileAttention";
import Header from "../components/header/Header";

function ProfileProfessional() {

  const professional = {
    imagen: "/Imágenes/trinidad.png",
    nombre: "Lic.Trinidad García",
    especialidad: "Clínica",
    fechaNac: "1989-03-16",  // del back lo tomo como YYYY-MM-DD en formato Date
    frase: {
      autor: "Jacques Lacan",
      texto: "Somos seres con la capacidad de desear pero siempre incompletos, de ahí surge nuestro caminar"
    }
  }

  return (
    <main className="w-full min-w-mobile flex flex-col items-center justify-center bg-background">
      <Header />
      <ProfileHeader
        imagen={professional.imagen}
        nombre={professional.nombre}
        especialidad={professional.especialidad}
      />
      <hr className='w-[290px] my-4 -mx-4' />
      <ProfileStudies />
      <hr className='w-[290px] my-4 -mx-4' />
      <ProfileHonorary />
      <ProfileAttention />
      <hr className='w-[290px] my-4 -mx-4' />
      <ProfileInformation
        fechaNac={professional.fechaNac}
        fraseAutor={professional.frase.autor}
        fraseTexto={professional.frase.texto}
      />
      <hr className='w-[290px] my-4 -mx-4' />
      <ProfileVideo />
      <hr className='w-[290px] my-4 -mx-4' />
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
