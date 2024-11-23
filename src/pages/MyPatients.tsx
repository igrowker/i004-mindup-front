import Header from '../components/header/Header'
import PatientCard from '../components/mypatients/PatientCard';

const MyPatients = () => {

    const confirmAppointments = [
        //EJEMPLO SIMULANDO BASE DE DATOS MUCHACHADA PARA CONFIRMAR
        {
            day: "Lunes",
            timeRange: "8 hs - 9 hs",
            patient: "Lucio Crack",
        },
        {
            day: "Martes",
            timeRange: "10 hs - 11 hs",
            patient: "Ludgwing Tipazo"
        },
        {
            day: "Miércoles",
            timeRange: "14 hs - 15 hs",
            patient: "Kevin Master"
        },
    ];

    return (
        <section className="flex flex-col items-center pb-2">
            <Header />
            <article className="flex my-4 justify-center items-center gap-2 w-[343px]">
                <h2 className="font-medium text-gray-800 text-lg">
                    Mis pacientes
                </h2>
            </article>
            <article className="flex flex-col my-4 justify-center items-center gap-2 w-[343px]">
                <PatientCard />
                <PatientCard />
                <PatientCard />
            </article>
            <article className="flex my-4 justify-center items-center gap-2 w-[343px]">
                <h2 className="font-medium text-gray-800 text-lg">
                    Solicitudes
                </h2>
            </article>
            <article className="flex flex-col my-4 justify-center items-center gap-2 w-[343px]">
                <PatientCard />
                <PatientCard />
                <PatientCard />
            </article>
        </section>
    )
}

export default MyPatients