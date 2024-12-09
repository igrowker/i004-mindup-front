import React, { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { cancelDate, confirmDate } from "../../api/userDates";
import { MdOutlineCancel } from "react-icons/md";

type CardProps = {
  id: string;
  day: string; // Día de la semana en texto
  timeRange: string; // Hora inicial en formato "HH:mm"
  psycho?: string;
  status: string;
  onRefresh: (date: Date | null) => void;
};

const DateCard: React.FC<CardProps> = ({
  id,
  day,
  timeRange,
  psycho = "",
  status,
  onRefresh,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      await confirmDate(id);
      if (onRefresh) {
        onRefresh(new Date())
      }
    } catch (error) {
      console.error("Error al aceptar la cita:", error);
    } finally {
      setIsLoading(false);
      setIsMenuOpen(false);
    }
  };

  const handleCancel = async () => {
    setIsLoading(true);
    try {
      await cancelDate(id);
      if (onRefresh) {
        onRefresh(new Date())
      }
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
        {status === "ACCEPTED" ? (
          <img
            className="w-6 h-6"
            src="public/Íconos/DobleConfirmación.svg"
            alt="Icono de confirmacion"
          />
        ) : status === "PENDING" ? (
          <img
            className="w-6 h-6"
            src="public/Íconos/Confirmado.svg"
            alt="Icono de cita pendiente"
          />
        ) : (
          status === "CANCELED" && (
            <MdOutlineCancel className="size-6 text-red-800" />
          )
        )}
      </header>
      <div className="h-full flex flex-col justify-center flex-grow">
        <h3 className="text-secondary font-bold">
          {formattedDay}, {formattedTimeRange}
        </h3>
        {psycho && <p className="text-sm text-[#444444]">{psycho}</p>}
      </div>
      {status !== "CANCELED" && (
        <button
          className="ml-auto"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
        >
          <IoChevronDownSharp className="size-4 text-[#85868B]" />
        </button>
      )}
      {isMenuOpen && (
        <ul className="absolute right-0 top-[72px] bg-white border border-zinc-200 rounded-md shadow-lg w-[343px] z-10">
          <li>
            {status === "PENDING" && (
              <button
                className="px-4 py-2 hover:bg-gray-100"
                disabled={isLoading}
                onClick={handleAccept}
              >
                {isLoading ? "Aceptando..." : "Aceptar"}
              </button>
            )}
          </li>
          <li>
            <button
              className="px-4 py-2 hover:bg-gray-100"
              disabled={isLoading}
              onClick={handleCancel}
            >
              {isLoading ? "Cancelando..." : "Cancelar"}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DateCard;
