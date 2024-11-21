import React from 'react';
import DateCard from './DateCard';

type Appointment = {
  day: string;
  timeRange: string;
  patient?: string;
  blocked?: boolean;
};

type DateCardListProps = {
  appointments: Appointment[];
};

const DateCardList: React.FC<DateCardListProps> = ({ appointments }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {appointments.map((appointment, index) => (
        <DateCard
          key={index}
          day={appointment.day}
          timeRange={appointment.timeRange}
          patient={appointment.patient}
          blocked={appointment.blocked}
        />
      ))}
    </div>
  );
};

export default DateCardList;
