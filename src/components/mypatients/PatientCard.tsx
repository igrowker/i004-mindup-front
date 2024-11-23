const PatientCard = () => {
    return (
        <div className="border border-zinc-200 rounded-md h-[68px] py-2 px-4 w-[343px] flex items-center gap-2">
            <header className="h-full flex justify-center items-center">
                
                    <img
                        className="w-6 h-6"
                        src="public/Íconos/HorarioBloqueado.svg"
                        alt="Icono de horario bloqueado"
                    />
            </header>
            <div className="h-full flex flex-col justify-center">
                <h3 className="text-secondary font-bold">
                    nombre
                </h3>
                <p className="text-sm text-[#444444]">paciente</p>
            </div>
        </div>
    )
}

export default PatientCard