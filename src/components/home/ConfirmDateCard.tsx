import React, { useState } from "react";
import { toast } from "sonner";
import { cancelDate, confirmDate } from "../../api/userDates";

type CardProps = {
  day: string;
  id: string;
  patient?: string;
  onRemove: (id: string) => void;
};

const ConfirmDateCard: React.FC<CardProps> = ({ day, id, patient = "", onRemove}) => {
  const [isLoading, setIsLoading] = useState(false);
  const formatDateTime = (isoDate: string) => {
    const date = new Date(isoDate);

    // Formatear la fecha
    let formattedDate = new Intl.DateTimeFormat("es-ES", {
      weekday: "long", // Día de la semana completo
      day: "numeric", // Día del mes
    }).format(date);

    // Capitalizar la primera letra
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    // Obtener el rango de horas
    const startHour = date.getHours();
    const endHour = startHour + 1; // Asumimos una duración de 1 hora

    return `${formattedDate}, ${startHour}hs - ${endHour}hs`;
  };

  const formattedDateTime = formatDateTime(day);

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      await confirmDate(id);
      onRemove(id);
      toast.success(`Se aceptó la cita de ${patient}`);
    } catch (error) {
      toast.error(`Error en aceptar la cita de ${patient}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    setIsLoading(true);
    try {
      await cancelDate(id);
      onRemove(id);
      toast.success(`Se rechazó la cita de ${patient}`);
    } catch (error) {
      toast.error(`Error en rechazar la cita de ${patient}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="shadow-[0px_0px_16px_rgba(0,0,0,0.2)] rounded-sm py-2 w-[288px] flex flex-col items-center justify-center gap-2">
      <div className="h-full flex justify-center items-center my-2 text-sm">
        <h3 className="text-secondary font-bold">{formattedDateTime}</h3>
        {patient && <p className=" text-[#444444]">&nbsp;-&nbsp;{patient}</p>}
      </div>
      <div className="w-full h-[1px] bg-gray-200"></div>
      <main className="flex gap-4 justify-center items-center w-full">
        <button
          onClick={handleCancel}
          disabled={isLoading}
          className="rounded border p-2 text-center text-xs font-medium w-24"
        >
          Rechazar
        </button>
        <button
          onClick={handleAccept}
          disabled={isLoading}
          className="rounded border p-2 text-center text-xs text-white bg-secondary w-24"
        >
          Aceptar
        </button>
      </main>
    </div>
  );
};

export default ConfirmDateCard;
