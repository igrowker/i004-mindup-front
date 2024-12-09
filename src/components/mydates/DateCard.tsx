import React, { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { cancelDate } from "../../api/userDates";

type CardProps = {
  id: string;
  day: string; // Día en texto, ej: "viernes"
  timeRange: string; // Hora inicial en formato "HH:mm"
  psycho?: string;
  accepted?: boolean;
  onCancel: (id: string) => void; // Recibe esta función desde el padre
};

const DateCard: React.FC<CardProps> = ({
  id,
  day,
  timeRange,
  psycho = "",
  accepted = false,
  onCancel,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleCancel = async () => {
    setIsLoading(true);
    try {
      await cancelDate(id); // Llamamos a la API para cancelar
      onCancel(id); // Notificamos al padre que la cita fue cancelada
    } catch (error) {
      console.error("Error al cancelar la cita:", error);
    } finally {
      setIsLoading(false);
      setIsMenuOpen(false);
    }
  };

  // Capitalizar la primera letra del día
  const capitalizeDay = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  // Formatear rango de horas desde la hora inicial
  const formatTimeRange = (startTime: string) => {
    const [hour] = startTime.split(":").map(Number);
    const endHour = (hour + 1) % 24; // Sumar una hora, manejar ciclos de 24h
    return `${hour}hs - ${endHour}hs`;
  };

  const formattedDay = capitalizeDay(day);
  const formattedTimeRange = formatTimeRange(timeRange);

  return (
    <div className="relative border border-zinc-200 rounded-md h-[68px] py-2 px-4 w-[343px] flex items-center gap-2">
      <header className="h-full flex justify-center items-center">
        {accepted ? (
          <img
            className="w-6 h-6"
            src="public/Íconos/DobleConfirmación.svg"
            alt="Icono de confirmacion"
          />
        ) : (
          <img
            className="w-6 h-6"
            src="public/Íconos/Confirmado.svg"
            alt="Icono de confirmacion"
          />
        )}
      </header>
      <div className="h-full flex flex-col justify-center flex-grow">
        <h3 className="text-secondary font-bold">
          {formattedDay}, {formattedTimeRange}
        </h3>
        {psycho && <p className="text-sm text-[#444444]">{psycho}</p>}
      </div>
      <button
        className="ml-auto"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
      >
        <IoChevronDownSharp className="size-4 text-[#85868B]" />
      </button>
      {isMenuOpen && (
        <ul className="absolute right-0 top-[72px] bg-white border border-zinc-200 rounded-md shadow-lg w-[343px] z-10">
          <button
            className="px-4 py-2 hover:bg-gray-100"
            onClick={handleCancel}
            disabled={isLoading}
          >
            {isLoading ? "Cancelando..." : "Cancelar"}
          </button>
        </ul>
      )}
    </div>
  );
};

export default DateCard;
