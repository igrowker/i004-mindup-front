import React from 'react'
import PatientCard from './PatientCard'

type Appointment = {
    image: string;
    time: string;
    name?: string;
    options: string;
    btnPendiente: boolean;
    id: string;
};

type PatientCardListProps = {
    appointments: Appointment[];
};

const PatientCardList: React.FC<PatientCardListProps> = ({ appointments }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {appointments.map((appointment, index) => (
                <PatientCard
                    key={index}
                    id={appointment.id}
                    image={appointment.image}
                    time={appointment.time}
                    patient={appointment.name}
                    options={appointment.options}
                    btnPendiente={appointment.btnPendiente}
                />
            ))}
        </div>
    )
}

export default PatientCardList