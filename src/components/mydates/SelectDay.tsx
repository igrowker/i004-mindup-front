import { useEffect, useState } from "react";
import Chip from "./Chip";
import MonthCalendar from "../home/MonthCalendar";
import { motion } from "framer-motion";
import DateCardList from "./DateCardList";
import SelectedProfessional from "./SelectedProfessional";
import { getDatesPatient } from "../../api/userDates";
import { useUserStore } from "../../context/userStore";
import { useNavigate } from "react-router-dom";

interface DateData {
  date: string;
  id: string;
  psychologist: {
    name: string;
  };
  status: string;
}

function SelectDay({
  onChipClick,
  onDateSelect,
}: {
  onChipClick: (time: string) => void;
  onDateSelect: (date: Date) => void;
}) {
  const [firstTurn, setFirstTurn] = useState(false);
  const [selectTurn, setSelectTurn] = useState(false);
  const [dateSelected, setDateSelected] = useState<Date | null>(null);
  const [dates, setDates] = useState<DateData[]>([]); // Estado para las citas
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useUserStore();

  // Maneja la selección de una fecha
  const handleDateSelect = (date: Date | null) => {
    if (date) {
      setDateSelected(date);
      onDateSelect(date); // Notifica la fecha seleccionada
    }
  };

  // Alterna el estado de "Primer turno disponible"
  const handleChange = () => {
    setFirstTurn(!firstTurn);
    setSelectTurn(false);
  };

  const fadeInOut = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  // Selecciona automáticamente el primer turno disponible
  useEffect(() => {
    if (firstTurn) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDateSelected(tomorrow);
      onDateSelect(tomorrow);
    }
  }, [firstTurn, onDateSelect]);

  // Obtiene las citas del usuario
  useEffect(() => {
    if (!user) return;

    const fetchDateData = async () => {
      setIsLoading(true);
      try {
        const dateData = (await getDatesPatient(user.id)) as DateData[];
        setDates(dateData);
      } catch (error) {
        console.error("Error fetching dates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDateData();
  }, [user]);

  return (
    <article className="min-h-screen w-full min-w-mobile flex flex-col items-center bg-background gap-5">
      <div>
        <h1 className="text-[#A1A1A1] m-4">Tu profesional elegido es:</h1>
        <SelectedProfessional />
      </div>
      <article>
        {isLoading ? (
          <div>Cargando Citas...</div>
        ) : (
          <DateCardList appointments={dates} setAppointments={setDates} />
        )}
      </article>
      <label className="flex items-center gap-2 cursor-pointer w-full justify-center">
        <span
          className={`text-gray-800 font-medium w-60 text-start ${
            firstTurn && "text-emerald-500"
          }`}
        >
          {firstTurn
            ? "Primer turno disponible"
            : "Ver primer turno disponible"}
        </span>
        <input
          type="checkbox"
          checked={firstTurn}
          onChange={() => handleChange()}
          className="hidden"
        />
        <span
          className={`w-12 h-6 flex items-center flex-shrink-0 p-1 bg-gray-400 rounded-full duration-300 ease-in-out ${
            firstTurn ? "bg-lime-600" : "bg-gray-400"
          }`}
        >
          <span
            className={`h-4 w-4 bg-white rounded-full shadow-md transform duration-300 ease-in-out ${
              firstTurn ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </span>
      </label>
      <section className="w-full flex justify-center">
        <motion.div {...fadeInOut}>
          {firstTurn ? (
            <motion.div {...fadeInOut}>
              <div className="rounded w-[340px] h-28 bg-gray-50 border border-[#CCCCCC] flex flex-col items-center p-4 gap-4">
                <h2 className="text-[#737373] font-semibold">
                  {dateSelected
                    ? dateSelected.toLocaleDateString("es-ES", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })
                    : ""}
                </h2>
                <div className="flex justify-evenly w-full">
                  <Chip time="8:00" onClick={onChipClick} />
                  <Chip time="12:00" onClick={onChipClick} />
                  <Chip time="14:00" onClick={onChipClick} />
                </div>
              </div>
            </motion.div>
          ) : (
            <button
              onClick={() => setSelectTurn(true)}
              className="bg-gray-100 h-10 w-80 flex items-center justify-center text-center relative rounded-lg"
            >
              <img
                src="public/Íconos/MisCitas.png"
                alt="Icono de agendar turno"
                className="w-5 absolute left-8"
              />
              <p>Seleccionar mi turno</p>
            </button>
          )}
        </motion.div>
      </section>

      {selectTurn && (
        <motion.div {...fadeInOut}>
          <MonthCalendar onDateSelect={handleDateSelect} />
        </motion.div>
      )}

      {dateSelected && selectTurn && (
        <motion.div
          key={dateSelected.toString()}
          {...fadeInOut}
          className="w-[370px]"
        >
          <section className="w-full flex flex-col items-center gap-8 mb-4">
            <div className="grid grid-cols-3 gap-2 gap-y-4 w-full items-center place-items-center">
              <Chip time="8:00" onClick={onChipClick} />
              <Chip time="12:00" onClick={onChipClick} />
              <Chip time="14:00" onClick={onChipClick} />
              <Chip time="16:00" onClick={onChipClick} />
              <Chip time="18:00" onClick={onChipClick} />
              <Chip time="20:00" onClick={onChipClick} />
            </div>
            <button className="bg-gray-100 h-10 w-80 flex items-center justify-center text-center relative rounded-lg" onClick={() => navigate('/selected')}>
              Cancelar
            </button>
          </section>
        </motion.div>
      )}
    </article>
  );
}

export default SelectDay;
