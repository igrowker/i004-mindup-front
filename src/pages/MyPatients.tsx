import Header from '../components/header/Header'
import PatientCardList from '../components/mypatients/PatientCardList';

const MyPatients = () => {

    const confirmAppointments = [
        //EJEMPLO SIMULANDO BASE DE DATOS MUCHACHADA PARA CONFIRMAR
        {
            img: "/Imágenes/image1.png",
            time: "Próximo turno: Lunes, 8 hs - 9 hs",
            patient: "Lucio Crack",
            options: "Emociones y ánimo",
            btnPendiente: false
        },
        {
            img: "/Imágenes/image2.png",
            time: "Turno pendiente: Lunes, 15 hs - 16 hs",
            patient: "Ludgwing Tipazo",
            options: "Hábitos y conductas, " + "Cambios importantes",
            btnPendiente: false
        },
        {
            img: "/Imágenes/image4.png",
            time: "Turno pendiente: Lunes, 17 hs - 18 hs",
            patient: "Kevin Master",
            options: "Relaciones interpersonales",
            btnPendiente: false
        },
    ];

    const PendingAppointments = [
        //EJEMPLO SIMULANDO BASE DE DATOS MUCHACHADA PARA CONFIRMAR
        {
            img: "/Imágenes/image3.png",
            time: "Turno solicitado: Miércoles, 10 hs - 11 hs",
            patient: "Camilo crack de cracks",
            options: "Emociones y ánimo",
            btnPendiente: true
        },
        {
            img: "/Imágenes/image5.png",
            time: "Turno solicitado: Viernes, 15 hs - 16 hs",
            patient: "Camilo Messi",
            options: "Crecimiento personal",
            btnPendiente: true
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
                <PatientCardList appointments={confirmAppointments} />
            </article>
            <article className="flex my-4 justify-center items-center gap-2 w-[343px]">
                <h2 className="font-medium text-gray-800 text-lg">
                    Solicitudes
                </h2>
            </article>
            <article className="flex flex-col my-4 justify-center items-center gap-2 w-[343px]">
                <PatientCardList appointments={PendingAppointments} />
            </article>
        </section>
    )
}

export default MyPatients