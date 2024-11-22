import React from "react";
import ConfirmDateCard from "./ConfirmDateCard";

type Appointment = {
  day: string;
  timeRange: string;
  patient?: string;
};

type DateCardListProps = {
  appointments: Appointment[];
};

const ConfirmDateCardList: React.FC<DateCardListProps> = ({ appointments }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {appointments.map((appointment, index) => (
        <ConfirmDateCard
          key={index}
          day={appointment.day}
          timeRange={appointment.timeRange}
          patient={appointment.patient}
        />
      ))}
    </div>
  );
};

export default ConfirmDateCardList;
