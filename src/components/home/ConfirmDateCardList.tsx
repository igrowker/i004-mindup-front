import React from "react";
import ConfirmDateCard from "./ConfirmDateCard";

type Appointment = {
  id: string;
  date: string;
  patient: {
    name: string;
  } 
};

type DateCardListProps = {
  appointments: Appointment[];
  onRemove: (id: string) => void;
};

const ConfirmDateCardList: React.FC<DateCardListProps> = ({ appointments, onRemove }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {appointments.map((appointment) => (
        <ConfirmDateCard
          key={appointment.id}
          id={appointment.id}
          day={appointment.date}
          patient={appointment.patient.name}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default ConfirmDateCardList;
