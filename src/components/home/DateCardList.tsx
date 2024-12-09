import React from "react";
import DateCard from "./DateCard";

type Appointment = {
  date: string;
  id: string;
  patientName: string;
  status: string;
};

type DateCardListProps = {
  appointments: Appointment[];
  onRefresh: (date: Date | null) => void;
};

const DateCardList: React.FC<DateCardListProps> = ({
  appointments, onRefresh
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

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {appointments.map((appointment) => {
        const { day, timeRange } = formatDate(appointment.date);
        return (
          <DateCard
            key={appointment.id}
            id={appointment.id}
            day={day}
            timeRange={timeRange}
            psycho={appointment.patientName}
            status={appointment.status}
            onRefresh={onRefresh}
          />
        );
      })}
    </div>
  );
};

export default DateCardList;
