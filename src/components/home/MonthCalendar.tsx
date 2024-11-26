import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface MonthCalendarProps {
  onDateSelect: (date: Date | null) => void; // Callback para manejar la fecha seleccionada
}

const MonthCalendar: React.FC<MonthCalendarProps> = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // Día actual por defecto

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from(
      { length: daysInMonth },
      (_, i) => new Date(year, month, i + 1)
    );
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getPreviousMonthDays = (date: Date, firstDayIndex: number) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const previousMonth = new Date(year, month, 0); // Último día del mes anterior
    const daysInPreviousMonth = previousMonth.getDate();
    return Array.from(
      { length: firstDayIndex },
      (_, i) =>
        new Date(year, month - 1, daysInPreviousMonth - firstDayIndex + i + 1)
    );
  };

  const handleDateSelect = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignorar horas en la comparación

    if (date >= today) {
      setSelectedDate(date); // Actualizar la fecha seleccionada
      onDateSelect(date); // Notificar al componente padre
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayIndex = getFirstDayOfMonth(currentDate);
    const previousMonthDays = getPreviousMonthDays(currentDate, firstDayIndex);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignorar horas para comparación
    const days = [];

    previousMonthDays.forEach((day, i) => {
      days.push(
        <div
          key={`prev-${i}`}
          className="text-[#DDDDDD] flex items-center justify-center size-8"
        >
          {day.getDate()}
        </div>
      );
    });

    daysInMonth.forEach((day, i) => {
      const isSelected = selectedDate?.toDateString() === day.toDateString();
      const isPast = day < today;

      days.push(
        <div
          key={i}
          className={`flex items-center text-center justify-center size-8 rounded-full cursor-pointer ${
            isSelected
              ? "bg-[#97D0C3] text-white"
              : isPast
              ? "text-[#DDDDDD] cursor-not-allowed"
              : "text-[#444444] hover:bg-gray-200"
          }`}
          onClick={() => !isPast && handleDateSelect(day)} // Solo permite seleccionar si no es pasado
        >
          {day.getDate()}
        </div>
      );
    });

    const totalDays = previousMonthDays.length + daysInMonth.length;
    const nextMonthDaysCount = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);
    for (let i = 1; i <= nextMonthDaysCount; i++) {
      days.push(
        <div
          key={`next-${i}`}
          className="text-[#DDDDDD] flex items-center justify-center size-8"
        >
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="w-[343px] mx-auto border border-[#CCCCCC] bg-[#FBFBFB] rounded-md px-3 py-4">
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
            onClick={() => changeMonth(-1)}
            className="flex items-center justify-center text-[#CCCCCC] hover:text-secondary"
          >
            <IoIosArrowBack className="size-5" />
          </button>
          <button
            onClick={() => changeMonth(1)}
            className="flex items-center justify-center text-[#CCCCCC] hover:text-secondary"
          >
            <IoIosArrowForward className="size-5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 my-2 place-items-center text-[#737373]">
        {["D", "L", "M", "M", "J", "V", "S"].map((day) => (
          <div key={day} className="size-8 flex justify-center items-center">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-2 place-items-center">
        {renderCalendar()}
      </div>
    </div>
  );
};

export default MonthCalendar;
