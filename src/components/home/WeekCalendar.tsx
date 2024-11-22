import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const WeekCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Función para cambiar la semana
  const changeWeek = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + increment * 7); // Incrementar o decrementar en semanas
    setCurrentDate(newDate);
  };

  // Función para obtener los días de la semana actual
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

  // Renderizar el calendario
  const renderCalendar = () => {
    const daysInWeek = getDaysInWeek(currentDate);
    const today = new Date(); // Fecha actual sin horas

    return daysInWeek.map((day, i) => {
      const isToday = day.toDateString() === today.toDateString(); // Compara si es el día actual
      return (
        <div
          key={i}
          className={`flex items-center justify-center size-8 cursor-pointer rounded-full ${
            isToday
              ? "bg-[#97D0C3] text-white" // Fondo para el día actual
              : selectedDate?.toDateString() === day.toDateString()
              ? "bg-zinc-950 text-white"
              : "text-[#444444] hover:bg-gray-200"
          }`}
          onClick={() => setSelectedDate(day)}
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
          <div key={day} className="size-8 flex justify-center items-center">
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
