import React from "react";
import { IoCheckmarkSharp, IoCheckmarkDoneSharp } from "react-icons/io5";

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
  consultationType = "",
  blocked = false,
}) => {
  return (
    <div className="border border-zinc-200 rounded-md p-4 w-[343px] flex gap-4">
      <header>
        {blocked ? (
          <IoCheckmarkDoneSharp className="text-green-600 size-6" />
        ) : (
          <IoCheckmarkSharp className="text-zinc-950 size-6" />
        )}
      </header>
      <div>
        <h3 className="text-lg text-slate-900 font-semibold mb-2">
          {day}, {timeRange}
        </h3>
        <p className="text-sm text-[#757575]">Paciente: {patient}</p>
        <p className="text-sm text-[#757575]">
          Tipo de Consulta: {consultationType}
        </p>
        {!blocked && (
          <button className="mt-4 py-1 px-2 text-sm border-[#767676] border bg-[#E3E3E3] rounded-md">
            Bloquear Horario
          </button>
        )}
      </div>
    </div>
  );
};

export default DateCard;
