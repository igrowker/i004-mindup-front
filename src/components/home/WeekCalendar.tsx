import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useUserStore } from "../../context/userStore";

interface WeekCalendarProps {
  onDateSelect: (date: Date | null) => void; // Callback para manejar la fecha seleccionada
}

const WeekCalendar: React.FC<WeekCalendarProps> = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // Día actual por defecto

  const { user } = useUserStore(); // Acceso al rol del usuario
  const isPatient = user?.role === "PATIENT";

  const changeWeek = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + increment * 7); // Incrementar o decrementar en semanas
    setCurrentDate(newDate);
  };

  const getDaysInWeek = (date: Date) => {
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay(); // Día actual de la semana (0 para domingo)
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek); // Mover al inicio de la semana
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day;
    });
  };

  const handleDateSelect = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignorar las horas para la comparación

    if ((isPatient && date > today) || (!isPatient && date >= today)) {
      // Verificar condiciones según el rol
      setSelectedDate(date); // Actualizar localmente la fecha seleccionada
      onDateSelect(date); // Notificar al componente padre
    }
  };

  const renderCalendar = () => {
    const daysInWeek = getDaysInWeek(currentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignorar las horas para comparación

    return daysInWeek.map((day, i) => {
      const isSelected = selectedDate?.toDateString() === day.toDateString();
      const isPastOrInvalid =
        (isPatient && day <= today) || (!isPatient && day < today); // Condición para pacientes y psicólogos

      return (
        <div
          key={i}
          className={`flex items-center justify-center size-8 rounded-full cursor-pointer ${
            isSelected
              ? "bg-[#97D0C3] text-white" // Día seleccionado por el usuario
              : isPastOrInvalid
              ? "text-[#DDDDDD] cursor-not-allowed" // Días no válidos deshabilitados
              : "text-[#444444] hover:bg-gray-200" // Días disponibles
          }`}
          onClick={() => !isPastOrInvalid && handleDateSelect(day)} // Solo permite seleccionar días válidos
        >
          {day.getDate()}
        </div>
      );
    });
  };

  return (
    <div className="w-[343px] mx-auto border border-[#CCCCCC] bg-[#FBFBFB] rounded-md px-3 py-4">
      {/* Botones para cambiar de semana */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[#737373] font-medium">
          {`${currentDate
            .toLocaleString("es-ES", { month: "long" })
            .charAt(0)
            .toUpperCase()}${currentDate
            .toLocaleString("es-ES", { month: "long" })
            .slice(1)} ${currentDate.getFullYear()}`}
        </h2>
        <div className="flex gap-1">
          <button
            onClick={() => changeWeek(-1)}
            className="flex items-center justify-center text-[#CCCCCC] hover:text-secondary"
          >
            <IoIosArrowBack className="size-5" />
          </button>
          <button
            onClick={() => changeWeek(1)}
            className="flex items-center justify-center text-[#CCCCCC] hover:text-secondary"
          >
            <IoIosArrowForward className="size-5" />
          </button>
        </div>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 my-2 place-items-center text-[#737373]">
        {["D", "L", "M", "M", "J", "V", "S"].map((day) => (
          <div
            key={day + Math.random()}
            className="size-8 flex justify-center items-center"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Cuerpo del calendario (semana actual) */}
      <div className="grid grid-cols-7 gap-y-2 place-items-center">
        {renderCalendar()}
      </div>
    </div>
  );
};

export default WeekCalendar;
