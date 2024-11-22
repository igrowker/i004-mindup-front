import React from "react";

type CardProps = {
  day: string;
  timeRange: string;
  patient?: string;
};

const ConfirmDateCard: React.FC<CardProps> = ({
  day,
  timeRange,
  patient = "",
}) => {

  const handleAccept = () => {
    console.log("Se acepto la cita de " + patient);
  };

  const handleDenied = () => {
    console.log("Se rechazo la cita de " + patient);
  };

  return (
    <div className="shadow-[0px_0px_16px_rgba(0,0,0,0.2)] rounded-sm py-2 w-[288px] flex flex-col items-center justify-center gap-2">
      <div className="h-full flex justify-center items-center my-2 text-sm">
        <h3 className="text-secondary font-bold">
          {day}, {timeRange}
        </h3>
        {patient && <p className=" text-[#444444]">&nbsp;-&nbsp;{patient}</p>}
      </div>
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
    </div>
  );
};

export default ConfirmDateCard;
