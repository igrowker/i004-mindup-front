import React from "react";
import DateCard from "./DateCard";

type Appointment = {
  date: string;
  id: string;
  psychologist: {
    name: string;
  };
  status: string;
};

type DateCardListProps = {
  appointments: Appointment[];
};

const DateCardList: React.FC<DateCardListProps> = ({ appointments }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const startOfWeek = new Date(today);
    const endOfWeek = new Date(today);

    // Calcular el inicio y fin de la semana
    startOfWeek.setDate(today.getDate() - today.getDay()); // Domingo de esta semana
    endOfWeek.setDate(today.getDate() + (6 - today.getDay())); // Sábado de esta semana

    // Verificar si la fecha está dentro de la semana actual
    const isThisWeek = date >= startOfWeek && date <= endOfWeek;

    // Formatear el día
    let day = date
      .toLocaleDateString("es-ES", { weekday: "long" })
      .replace(/^\w/, (c) => c.toUpperCase()); // Convertir la primera letra en mayúscula

    // Agregar el número del día si no está en esta semana
    if (!isThisWeek) {
      const dayNumber = date.getDate();
      day = `${day}, ${dayNumber}`;
    }

    // Formatear el rango de horas
    const timeRange = date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return { day, timeRange };
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {appointments.map((appointment) => {
        const { day, timeRange } = formatDate(appointment.date);

        return (
          <DateCard
            key={appointment.id}
            day={day}
            timeRange={timeRange}
            psycho={appointment.psychologist.name}
            accepted={appointment.status === "ACCEPTED"}
          />
        );
      })}
    </div>
  );
};

export default DateCardList;
