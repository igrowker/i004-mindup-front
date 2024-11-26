import { toast } from "sonner";

type PatientCardProps = {
    img: string;
    time: string;
    patient?: string;
    consultationType?: string;
    options?: string;
    btnPendiente: boolean;
};

const PatientCard: React.FC<PatientCardProps> = ({ img, time, patient = "", options, btnPendiente }) => {

    const handleAccept = () => {
        console.log("Se acepto la cita de " + patient);
        toast.success(`Se acepto la cita de ${patient}`);
        //TODO aplicar logica para que la tarjeta se elimine de la lista
    };

    const handleDenied = () => {
        console.log("Se rechazo la cita de " + patient);
        toast.info(`Se rechazo la cita de ${patient}`);
        //TODO aplicar logica para que la tarjeta se elimine de la lista
    };


    return (
        <>
            <div className="border border-zinc-200 rounded-md h-full py-2 px-4 w-[343px] flex flex-col  items-start gap-2">
                <div className="flex gap-3">
                    <header className="h-full flex justify-center items-center">
                        <img
                            className="w-12 h-12"
                            src={img}
                            alt="Icono de horario bloqueado"
                        />
                    </header>
                    <div className="h-full flex flex-col justify-center">
                        <h3 className="text-text text-sm font-bold">
                            {patient}
                        </h3>
                        <p className="text-[12px] text-[#444444]">{time}</p>
                        <p className="text-[12px] text-[#969696]">{options}</p>
                    </div>
                </div>
                {btnPendiente && (
                    <>
                        <div className="w-full h-[1px] bg-gray-200"></div>
                        <main className="flex gap-4 justify-center items-center w-full">
                            <button onClick={handleDenied} className="rounded border p-2 text-center text-xs font-medium w-24">
                                Rechazar
                            </button>
                            <button
                                onClick={handleAccept}
                                className="rounded border p-2 text-center text-xs text-white bg-secondary w-24"
                            >
                                Aceptar
                            </button>
                        </main>
                    </>
                )}
            </div>
        </>
    )
}

export default PatientCard