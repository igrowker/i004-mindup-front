import { useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { createDate } from "../../api/userDates";
import {
  selectedProfessionalStore,
  useUserStore,
} from "../../context/userStore";
import SelectedProfessional from "./SelectedProfessional";

function ConfirmTurn({
  selectedDate,
  selectedTime,
  setFase,
}: {
  selectedDate: Date | undefined;
  selectedTime: string | undefined;
  setFase: () => void;
}) {
  useEffect(() => {
    // Para checkear que se hayan mandado props correctas y no poder entrar si no se eligio
    if (!selectedDate || !selectedTime) {
      setFase();
    }
  }, [selectedDate, selectedTime, setFase]);

  const { selectedProfessional } = selectedProfessionalStore();
  const { user } = useUserStore();

  const navigate = useNavigate();

  const handleDenied = () => {
    setFase();
    toast.info("Seleccione un nuevo turno");
  };

  const handleAccept = () => {
    console.log(user, selectedDate, selectedTime, selectedProfessional);
    if (!user || !selectedDate || !selectedTime || !selectedProfessional) {
      toast.error("Faltan datos para completar la operación.");
      return;
    }

    // Combinar fecha y hora en formato ISO
    const [hours, minutes] = selectedTime.split(":").map(Number);
    const combinedDateTime = new Date(selectedDate);
    combinedDateTime.setHours(hours, minutes);

    const isoDateTime = combinedDateTime.toISOString();

    // Mostrar notificación de éxito
    toast.success(`Turno aceptado para ${isoDateTime}`);

    // Llamada a la API con el formato correcto
    createDate({
      patientId: user.id,
      psychologistId: selectedProfessional,
      date: isoDateTime,
    })
      .then(() => {
        toast.success("Turno guardado con exito.");
        navigate("/home");
      })
      .catch((error) => {
        toast.error("Hubo un problema al guardar el turno.");
        console.error(error);
      });
  };

  const options: Intl.DateTimeFormatOptions = {
    //Formateo de la fecha
    weekday: "long",
    day: "numeric",
  };

  // Nombre abreviado del mes
  const monthNames = [
    "Ene.",
    "Feb.",
    "Mar.",
    "Abr.",
    "May.",
    "Jun.",
    "Jul.",
    "Ago.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dic.",
  ];

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const formattedDate = selectedDate
    ? capitalize(
        `${selectedDate.toLocaleDateString("es-ES", options)} ${
          monthNames[selectedDate.getMonth()]
        } ${selectedDate.getFullYear()}`
      )
    : "Fecha no seleccionada";

  const fadeInOut = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  return (
    <article className="flex flex-col items-center w-full p-4 gap-8 mt-4">
      <h1 className="text-[#A1A1A1]">Confirmá el turno para guardar</h1>
      <div className="w-[342px] shadow rounded-lg border flex flex-col p-2 px-20 items-start border-[#E5E7EB]">
        <h2 className="text-lg text-black font-semibold">{formattedDate}</h2>
        <p className="text-text">{selectedTime}</p>
      </div>
      <SelectedProfessional/>
      <motion.div {...fadeInOut}>
        <div className="shadow-[0px_0px_16px_rgba(0,0,0,0.2)] rounded-sm py-4 w-[288px] flex flex-col text-center items-center justify-center gap-2">
          <h5 className="font-medium text-black">
            ¿Seguro deseas agendar tu nuevo horario?
          </h5>
          <div className="w-full h-[1px] bg-gray-200"></div>
          <main className="flex px-4 pt-2 gap-4 justify-center items-center w-full">
            <button
              onClick={handleDenied}
              className="rounded border p-2 text-center font-medium w-32"
            >
              Rechazar
            </button>
            <button
              onClick={handleAccept}
              className="rounded border p-2 text-center text-white bg-secondary w-32"
            >
              Aceptar
            </button>
          </main>
        </div>
      </motion.div>
    </article>
  );
}

export default ConfirmTurn;
