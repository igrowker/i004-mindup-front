import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const MonthCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Función para cambiar el mes
  const changeMonth = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  // Función para obtener los días del mes actual
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from(
      { length: daysInMonth },
      (_, i) => new Date(year, month, i + 1)
    );
  };

  // Función para obtener el primer día del mes (inicia en domingo)
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Función para obtener los días del mes anterior que completan la primera semana
  const getPreviousMonthDays = (date: Date, firstDayIndex: number) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const previousMonth = new Date(year, month, 0); // Último día del mes anterior
    const daysInPreviousMonth = previousMonth.getDate();
    return Array.from(
      { length: firstDayIndex },
      (_, i) => new Date(year, month - 1, daysInPreviousMonth - firstDayIndex + i + 1)
    );
  };

  // Renderizar el calendario
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayIndex = getFirstDayOfMonth(currentDate); // Día inicial (0: Domingo)
    const previousMonthDays = getPreviousMonthDays(currentDate, firstDayIndex);
    const today = new Date(); // Fecha actual sin horas

    // Crear una matriz para los días del mes
    const days = [];

    // Agregar días del mes anterior para completar la primera semana
    previousMonthDays.forEach((day, i) => {
      days.push(
        <div
          key={`prev-${i}`}
          className="text-gray-300 flex items-center justify-center size-9"
        >
          {day.getDate()}
        </div>
      );
    });

    // Agregar los días del mes
    daysInMonth.forEach((day, i) => {
      const isToday = day.toDateString() === today.toDateString(); // Comparar con el día actual
      days.push(
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
          {day.getDate()}
        </div>
      );
    });

    // Agregar días del mes siguiente para completar la última semana (si es necesario)
    const totalDays = previousMonthDays.length + daysInMonth.length;
    const nextMonthDaysCount = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);
    for (let i = 1; i <= nextMonthDaysCount; i++) {
      days.push(
        <div
          key={`next-${i}`}
          className="text-gray-300 flex items-center justify-center size-9"
        >
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="w-64 mx-auto font-sans border border-zinc-200 rounded-md px-3 py-4">
      {/* Botones para cambiar de mes */}
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => changeMonth(-1)}
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
          onClick={() => changeMonth(1)}
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

      {/* Cuerpo del calendario */}
      <div className="grid grid-cols-7 text-sm">
        {renderCalendar()}
      </div>
    </div>
  );
};

export default MonthCalendar;
