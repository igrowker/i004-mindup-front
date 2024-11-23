import React from 'react'
import PatientCard from './PatientCard'

type Appointment = {
    img: string;
    time: string;
    patient?: string;
    options: string;
    btnPendiente: boolean
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
                    img={appointment.img}
                    time={appointment.time}
                    patient={appointment.patient}
                    options={appointment.options}
                    btnPendiente={appointment.btnPendiente}
                />
            ))}
        </div>
    )
}

export default PatientCardList