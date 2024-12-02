import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInformation from "../components/profile/ProfileInformation";
import ProfileTerapy from "../components/profile/ProfileTerapy";
import CustomButton from "../components/shared/CustomButton";
import { useState } from "react";
import { useModalStore} from "../context/userStore";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import Modal from "../components/modal/Modal";

const ProfilePacient = () => {
  const {openModal, toggleModal} = useModalStore();

  const navigate = useNavigate();

  const [showPersonal, setShowPersonal] = useState(true);
  const [showTerapy, setShowTerapy] = useState(false);
  const [personalDisabled, setPersonalDisabled] = useState(true);
  const [terapyDisabled, setTerapyDisabled] = useState(false);

  const toggleShowPersonal = () => {
    setShowPersonal(true);
    setShowTerapy(false);
    setPersonalDisabled(true);
    setTerapyDisabled(false);
  };

  const toggleShowTerapy = () => {
    setShowPersonal(false);
    setShowTerapy(true);
    setPersonalDisabled(false);
    setTerapyDisabled(true);
  };

  const pacient = {
    imagen: "/Imágenes/miguel.png",
    nombre: "Miguel Rojas",
    especialidad: "Ha realizado terapia anteriormente",
    frase: {
      autor: "Anónimo",
      texto:
        "La paz comienza en el momento en que eliges no permitir que otra persona o evento controle tus emociones.",
    },
  };

  const handleAccept = () =>{
    navigate("/questionnaire")
    toggleModal()
  }

  return (
    <main className="w-full min-w-mobile flex flex-col items-center justify-center bg-background">
      <Header />
      <ProfileHeader
        imagen={pacient.imagen}
        nombre={pacient.nombre}
        especialidad={pacient.especialidad}
      />
      <hr className="w-[290px] my-4 -mx-4" />

      {/* Botones */}
      <div className="w-[343px] flex my-2 mb-6 px-2 justify-between ">
        <button
          onClick={toggleShowPersonal}
          disabled={personalDisabled}
          className={`inline-block w-full rounded-l-[50pc] text-center border px-3 py-3 font-medium focus:outline-none focus:ring border-[#7a5fe7] ${
            personalDisabled
              ? "bg-gray-300 text-gray-500 border-0"
              : "bg-[#7a5fe7] text-white hover:bg-transparent hover:text-[#7a5fe7] active:text-[#7a5fe7]"
          }`}
        >
          Personal
        </button>
        <button
          onClick={toggleShowTerapy}
          disabled={terapyDisabled}
          className={`inline-block w-full rounded-r-[50pc] text-center border px-3 py-3 font-medium focus:outline-none focus:ring border-[#7a5fe7] ${
            terapyDisabled
              ? "bg-gray-300 text-gray-500  border-0"
              : "bg-[#7a5fe7] text-white hover:bg-transparent hover:text-[#7a5fe7] active:text-[#7a5fe7]"
          }`}
        >
          Terapia
        </button>
      </div>

      {/* Informacion Personal */}
      {showPersonal && (
        <ProfileInformation
          fraseAutor={pacient.frase.autor}
          fraseTexto={pacient.frase.texto}
        />
      )}

      {/* Informacion de la terapia */}
      {showTerapy && (
        <>
          <ProfileTerapy />
          <article className=" mb-6">
            <hr className="w-[290px] my-4 -mx-4" />
            <CustomButton
              title="Rehacer cuestionario"
              appearance={true}
              type="submit"
              onClick={() => { toggleModal() }}
            />
          </article>
        </>
      )}
    {openModal && <Modal title="Seguro que desea rehacer el formulario? Esto no se puede deshacer." onClick={handleAccept} />}
      <br />
    </main>
  );
};

export default ProfilePacient;
