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
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>; // Permite actualizar las citas desde el padre
};

const DateCardList: React.FC<DateCardListProps> = ({
  appointments,
  setAppointments,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
    });
    const timeRange = date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { day, timeRange };
  };

  const handleCancel = (id: string) => {
    setAppointments((prev) =>
      prev.filter((appointment) => appointment.id !== id)
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {appointments
        .filter((appointment) => appointment.status !== "CANCELED") // Evita renderizar citas canceladas
        .map((appointment) => {
          const { day, timeRange } = formatDate(appointment.date);
          return (
            <DateCard
              key={appointment.id}
              id={appointment.id}
              day={day}
              timeRange={timeRange}
              psycho={appointment.psychologist.name}
              accepted={appointment.status === "ACCEPTED"}
              onCancel={handleCancel} // Pasa la función de cancelación al hijo
            />
          );
        })}
    </div>
  );
};

export default DateCardList;
