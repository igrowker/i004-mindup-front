import React from 'react'
import AppointmentCard from './AppointmentCard'

type Appointment = {
    image: string;
    time: string;
    name?: string;
    options: string;
    id: string;
};

type AppointmentCardListProps = {
    appointments: Appointment[];
};

const AppointmentCardList: React.FC<AppointmentCardListProps> = ({ appointments }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {appointments.map((appointment, index) => (
                <AppointmentCard
                    key={index}
                    id={appointment.id}
                    image={appointment.image}
                    time={appointment.time}
                    patient={appointment.name}
                    options={appointment.options}
                />
            ))}
        </div>
    )
}

export default AppointmentCardList