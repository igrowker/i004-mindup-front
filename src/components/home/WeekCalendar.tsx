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
    const dayOfWeek = startOfWeek.getDay(); // Obtén el día actual de la semana (0 para domingo)
    
    // Ajuste para mover al inicio de la semana (domingo)
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);
  
    // Generar los 7 días a partir del inicio de la semana
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
      const formattedDay = day.getDate();
      const isToday = day.toDateString() === today.toDateString(); // Compara si es el día actual
      
      return (
        <div
          key={i}
          className={`flex items-center justify-center size-9 cursor-pointer rounded-lg ${
            isToday
              ? "bg-[#AFF4C6]" // Fondo para el día actual
              : selectedDate?.toDateString() === day.toDateString()
              ? "bg-zinc-950 text-white"
              : "text-zinc-950 hover:bg-gray-200"
          }`}
          onClick={() => setSelectedDate(day)}
        >
          {formattedDay}
        </div>
      );
    });
  };

  return (
    <div className="w-64 mx-auto font-sans border border-zinc-200 rounded-md px-3 py-4">
      {/* Botones para cambiar de semana */}
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => changeWeek(-1)}
          className="size-7 flex items-center justify-center text-zinc-400 rounded-md border border-zinc-200 hover:text-zinc-950 hover:border-zinc-950"
        >
          <IoIosArrowBack />
        </button>
        <h2 className="text-zinc-950 font-medium text-sm">
          {`${currentDate
            .toLocaleString("es-ES", { month: "long" })
            .charAt(0)
            .toUpperCase()}${currentDate
            .toLocaleString("es-ES", { month: "long" })
            .slice(1)} ${currentDate.getFullYear()}`}
        </h2>
        <button
          onClick={() => changeWeek(1)}
          className="size-7 flex items-center justify-center text-zinc-400 rounded-md border border-zinc-200 hover:text-zinc-950 hover:border-zinc-950"
        >
          <IoIosArrowForward />
        </button>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 text-center text-zinc-500 text-[12px]">
        {["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"].map((day) => (
          <div key={day} className="size-9 flex justify-center items-center">
            {day}
          </div>
        ))}
      </div>

      {/* Cuerpo del calendario (semana actual) */}
      <div className="grid grid-cols-7 text-sm">
        {renderCalendar()}
      </div>
    </div>
  );
};

export default WeekCalendar;
