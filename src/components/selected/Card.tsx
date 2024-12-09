import { LuMusic } from "react-icons/lu";
import { RiGroupLine } from "react-icons/ri";
import { LuBookOpen } from "react-icons/lu";
import { CiMoneyBill } from "react-icons/ci";
import { CardData } from "./SliderCard";
import CustomButton from "../shared/CustomButton";
import { useNavigate } from "react-router-dom";
import { selectedProfessionalStore, useUserStore } from "../../context/userStore";
import { FaUser } from "react-icons/fa6";

const Card: React.FC<CardData> = ({
  first,
  text,
  paragraph,
  userId,
  name,
  lastname,
  image,
  terapy_type,
  attention_type,
  honorarys,
  phrase,
  author,
  song,
}) => {
  const navigate = useNavigate();
  const { setSelectedProfessional } = selectedProfessionalStore();
  const {user} = useUserStore();

  const handleAppointment = () => {
    if (!userId) {
      navigate("/questionnaire");
      return;
    }

    setSelectedProfessional(userId);
    navigate("/mydates");
  };

  if (first) {
    return (
      <div className="bg-background shadow-md rounded-lg p-4 w-full max-w-[21rem] sm:max-w-sm flex flex-col justify-between h-auto mb-6">
        <div className="flex flex-col w-full justify-center items-center gap-10">
          <div className="pb-6 border-b-2 border-secondary w-[80%]">
            <div className="pb-6 flex justify-center mt-4">
              <img src={image} alt="first card image" />
            </div>
            <div className="text-center w-full">
              <h3 className="text-xl font-bold">¡Hola, {user?.name}!</h3>
            </div>
          </div>
          <div className="text-center text-xl w-full font-semibold">
            <h4>{text}</h4>
          </div>
          <div className="text-center flex flex-col items-center pb-4 w-full">
            <p>{paragraph && paragraph[0]}</p>
            <br />
            <p className="w-[80%] pb-4">{paragraph && paragraph[1]}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background shadow-md rounded-lg p-4 w-full max-w-[21rem] sm:max-w-sm flex flex-col justify-between h-auto mb-4">
      <header className="flex items-center mb-2 border-b-2 border-secondary pb-2">
        <div className="flex-shrink-0 ml-4">
          {image ? (
            <img
              className="w-20 h-20 object-cover rounded-full"
              src={image}
              alt="Imagen de perfil del profesional."
            />
          ) : (
            <FaUser className="size-[86px] bg-[#989898] fill-zinc-600 rounded-full" />
          )}
        </div>
        <div className="ml-6">
          <h3 className="text-base font-bold text-black inline-flex items-center">
            Lic.{name} {lastname}
            <span className="ml-2">
              <img
                className="w-4 h-4"
                src="/Íconos/Vector.png"
                alt="Ícono de verificación"
              />
            </span>
          </h3>
          <h4 className="text-xs font-medium text-black">{terapy_type}</h4>
        </div>
      </header>

      <main className="flex flex-col gap-2">
        <div className="flex justify-between ">
          <p className="text-xs font-bold flex items-center">
            <RiGroupLine className="mr-2" size={16} />
            Tipo de atención
          </p>
          <p className="text-xs font-medium">{attention_type}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-xs font-bold flex items-center">
            <CiMoneyBill className="mr-2" size={16} />
            Honorarios por sesión
          </p>
          <p className="text-xs font-medium">{honorarys}</p>
        </div>

        <div>
          <h5 className="text-xs font-bold mb-2">Sobre {name}</h5>
          <div className="relative w-full h-48 bg-zinc-500 flex justify-center">
            <img
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14"
              src="/public/Íconos/PlayIcon.png"
              alt="Play Icon"
            />
          </div>
        </div>

        <div>
          <h5 className="text-xs font-bold mb-2 flex items-center">
            <LuBookOpen className="mr-2" size={16} />
            Frase de {name}
          </h5>
          <p className="text-center text-xs ">
            {phrase} <br /> - {author}
          </p>
        </div>

        <div className="flex justify-between">
          <h5 className="text-xs font-bold flex items-center">
            <LuMusic className="mr-2" size={16} />
            Su canción
          </h5>
          <p className="text-xs font-medium">{song}</p>
        </div>
      </main>
      <div className="flex justify-center mt-4 gap-4">
        <CustomButton
          title="Agendar turno"
          appearance={true}
          onClick={() => {
            handleAppointment();
          }}
        />
      </div>
    </div>
  );
};

export default Card;
