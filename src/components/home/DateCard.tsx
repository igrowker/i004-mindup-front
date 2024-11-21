import React from "react";

type CardProps = {
  day: string;
  timeRange: string;
  patient?: string;
  consultationType?: string;
  blocked?: boolean;
};

const DateCard: React.FC<CardProps> = ({
  day,
  timeRange,
  patient = "",
  blocked = false,
}) => {
  return (
    <div className="border border-zinc-200 rounded-md h-[68px] py-2 px-4 w-[343px] flex items-center gap-2">
        <header className="h-full flex justify-center items-center">
          {blocked ? (
            <img className="w-6 h-6" src="public/Íconos/DobleConfirmación.svg" alt="Icono de confirmacion" />
          ) : (
            <img className="w-6 h-6" src="public/Íconos/HorarioBloqueado.svg" alt="Icono de horario bloqueado" />
          )}
        </header>
        <div className="h-full flex flex-col justify-center">
          <h3 className="text-secondary font-bold">
            {day}, {timeRange}
          </h3>
          {patient && <p className="text-sm text-[#444444]">{patient}</p>}
        </div>
      <main>

      </main>
    </div>
  );
};

export default DateCard;
