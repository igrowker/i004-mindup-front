import CustomButtonHome from "../components/home/CustomButtonHome";
import Header from "../components/header/Header";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DynamicButton from "../components/onboarding/DynamicButton";
import { useUserStore } from "../context/userStore";
import { FaUser } from "react-icons/fa6";

function HomePacient() {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const fadeInOut = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  return (
    <section className="flex flex-col items-center pb-2">
      <Header />
      <article className="flex my-4 justify-center items-center gap-2 w-[343px]">
        {user?.image ? (
          <img
            className="size-[86px] rounded-full"
            src={user?.image}
            alt="Imagen de perfil"
          />
        ) : (
          <FaUser className="size-[86px] bg-[#989898] fill-zinc-600 rounded-full" />
        )}

        <div className="w-60 mt-4">
          <h2 className="text-xl font-semibold  text-gray-800">
            Hola, {user?.name}
          </h2>
          <p className="text-[#A1A1A1] text-[15px] leading-tight">
            Estamos aquí para escucharte y apoyarte en todo momento.
          </p>
        </div>
      </article>
      <motion.div {...fadeInOut}>
        <div className="flex flex-col h-96 justify-between">
          <article className="mb-3 text-center flex flex-col justify-center items-center gap-6">
            <CustomButtonHome
              icon="MisCitas.png"
              title="Mis citas"
              type="button"
              onClick={() => navigate("/mydates")}
            />
            <div className="text-lg bg-secondary shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded text-[#FFFFFF] w-72 p-2 px-4 text-wrap text-start">
              No tienes citas hoy. {/* "9am" va a ser una variable */}
            </div>
            <CustomButtonHome
              onClick={() => navigate("/selected")}
              icon="ProfesionalesCompatibles.png"
              title="Profesionales compatibles"
              type="button"
            />
            <CustomButtonHome
              onClick={() => navigate("/assistance")}
              icon="Asistencia.svg"
              title="Asistencia"
              type="button"
            />
          </article>
          <article className="mb-3 text-center flex flex-col justify-center items-center gap-6">
            <DynamicButton
              buttonText="Asistente de emergencia"
              bgColor="bg-secondaryBtn"
              textColor="text-background"
              onClick={() => navigate("/assistance")}
            />
          </article>
        </div>
      </motion.div>
    </section>
  );
}

export default HomePacient;
