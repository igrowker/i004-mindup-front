import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Header from "../components/header/Header";
import WeekCalendar from "../components/home/WeekCalendar";
import DateCardList from "../components/home/DateCardList";
import CustomButton from "../components/shared/CustomButton";


import { useAvailableForUrgenciesStore, useEmergencyModalStore, useUserStore } from "../context/userStore";
import { getAppointmentByDate } from "../api/userDates";
import { FaUser } from "react-icons/fa6";
import Modal from "../components/modal/Modal";

type Appointment = {
  date: string;
  id: string;
  patientName: string;
  status: string;
};

function HomePsychologist() {
  const { user } = useUserStore();
  const apiUrl = import.meta.env.VITE_COREURL;
  const navigate = useNavigate();
  const { openEmergencyModal, toggleEmergencyModal } = useEmergencyModalStore();
  const { openAvailableForUrgencies, toggleAvailableForUrgencie } =
    useAvailableForUrgenciesStore();

  const [availableForUrgencies, setAvailableForUrgencies] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Appointment[]>([]);

  if (!user) {
    return null;
  }

  useEffect(() => {
    if (user) {
      handleDateSelect(new Date());
    }
  }, []);

  const handleDateSelect = async (date: Date | null) => {
    if (!date) return;
    setSelectedDate([]);

    // Formatear la fecha a "YYYY-MM-DD"
    const formattedDate = date.toISOString().split("T")[0];

    try {
      const response = await getAppointmentByDate(formattedDate, user.id);
      setSelectedDate(response);
    } catch (error) {
      console.error("Error obteniendo citas:", error);
    }
  };

  // Sincronizar disponibilidad inicial
  useEffect(() => {
    setAvailableForUrgencies(openAvailableForUrgencies);
  }, [openAvailableForUrgencies]);

  // Función para alternar disponibilidad
  const toggleUrgenciesAvailability = useCallback(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/user/availability/${user.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        toggleEmergencyModal();
        toggleAvailableForUrgencie();
        setAvailableForUrgencies(data.availability);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchAvailability();
  }, [toggleEmergencyModal, toggleAvailableForUrgencie, user?.id]);

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
          <h2 className="text-xl font-semibold text-gray-800">
            Hola, {user?.name}
          </h2>
          <p className="text-[#A1A1A1] text-[15px] leading-tight">
            Tu empatía y profesionalismo marcan una gran diferencia en la vida
            de quienes necesitan apoyo.
          </p>
        </div>
      </article>
      <motion.div {...fadeInOut}>
        <article className="mb-3 text-center">
          <h1 className="font-medium text-gray-800 text-lg">
            Tus turnos de esta semana
          </h1>
          <WeekCalendar onDateSelect={handleDateSelect} />
        </article>
        <article className="mb-8">
          <DateCardList appointments={selectedDate} onRefresh={handleDateSelect} />
        </article>
        <div className="flex justify-center">
          <CustomButton
            title="Gestionar Turnos"
            type="button"
            onClick={() => navigate("/manage-appointment")}
            appearance={true}
          />
        </div>
        <article className="mt-12 flex items-center justify-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={availableForUrgencies}
              onChange={toggleEmergencyModal}
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
      </motion.div>
      {openEmergencyModal && (
        <Modal
          title={
            availableForUrgencies
              ? "¿Desactivar su disponibilidad para urgencias?"
              : "¿Activar su disponibilidad para urgencias?"
          }
          onClose={toggleEmergencyModal}
          onClick={toggleUrgenciesAvailability}
        />
      )}
    </section>
  );
}

export default HomePsychologist;

