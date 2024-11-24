import WeekCalendar from "../components/home/WeekCalendar";
import DateCardList from "../components/home/DateCardList";
import CustomButton from "../components/shared/CustomButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/header/Header";

const appointments = [
  //EJEMPLO SIMULANDO BASE DE DATOS MUCHACHADA
  {
    day: "Lunes",
    timeRange: "8 hs - 9 hs",
  },
  {
    day: "Martes",
    timeRange: "10 hs - 11 hs",
    patient: "Carlos Ruiz",
    aviable: false,
    blocked: true,
  },
  {
    day: "Miércoles",
    timeRange: "14 hs - 15 hs",
  },
];
// const [drawer, setDrawer] = useState(false);


function HomePsychologist() {
  const navigate = useNavigate();
  const [availableForUrgencies, setAvailableForUrgencies] = useState(false);

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.blocked
  );

  return (
    <section className="flex flex-col items-center pb-2">

      <Header />
      <article className="flex my-4 justify-start items-center gap-2 w-[343px]">
        <div className="size-10 rounded-full bg-zinc-600"></div>
        <h2 className="text-xl font-semibold text-gray-800">Hola, Trinidad</h2>

        {/* 
      <header className="bg-secondary w-full pl-4 py-2 gap-2 text-white flex items-center">
        <button className="p-1">
          <RxHamburgerMenu className="size-6" />
        </button>
        <img src="/public/logo1.png" alt="MindUp Logo" className="h-11" />
      </header>
      <article className="flex mt-12 my-4 justify-start items-center gap-4 w-[343px]">
        <img className="size-[86px] rounded-full" src="public/Imágenes/TrinidadProfesional.png" alt="Imagen de perfil" />
        <div className="w-60 mt-4">
         <h2 className="text-xl font-semibold text-gray-800">Hola, Trinidad</h2>
         <p className="text-[#A1A1A1] text-[15px] leading-tight">Tu empatía y profesionalismo marcan una gran diferencia en la vida de quienes necesitan apoyo</p>
        </div>
        */}

      </article>
      <article className="mb-3 text-center">
        <h1 className="font-medium text-gray-800 text-lg">
          Tus turnos de esta semana
        </h1>
        <WeekCalendar />
      </article>
      <article className="mb-8">
        <DateCardList appointments={filteredAppointments} />
      </article>
      <CustomButton
        title="Gestionar Turnos"
        type="button"
        onClick={() => navigate("/manage-appointment")}
        appearance={true}
      />

      {/* Nuevo interruptor */}
      <article className="mt-12 flex items-center gap-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={availableForUrgencies}
            onChange={() => setAvailableForUrgencies(!availableForUrgencies)}
            className="hidden"
          />
          <span
            className={`w-12 h-6 flex items-center flex-shrink-0 p-1 bg-gray-400 rounded-full duration-300 ease-in-out ${
              availableForUrgencies ? "bg-lime-600" : "bg-gray-400"
            }`}
          >
            <span
              className={`h-4 w-4 bg-white rounded-full shadow-md transform duration-300 ease-in-out ${
                availableForUrgencies ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </span>
          <span className="text-gray-800 font-medium w-60 text-start">
            {availableForUrgencies
              ? "Disponible para urgencias"
              : "No Disponible para urgencias"}
          </span>
        </label>
      </article>
    </section>
  );
}

export default HomePsychologist;
