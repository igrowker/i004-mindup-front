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
};

const ConfirmDateCardList: React.FC<DateCardListProps> = ({ appointments }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {appointments.map((appointment, index) => (
        <ConfirmDateCard
          key={index}
          id={appointment.id}
          day={appointment.date}
          patient={appointment.patient.name}
        />
      ))}
    </div>
  );
};

export default ConfirmDateCardList;
