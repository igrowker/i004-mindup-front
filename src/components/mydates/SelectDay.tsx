import { useState } from "react";
import Chip from "./Chip";
import MonthCalendar from "../home/MonthCalendar";

function SelectDay({
  onChipClick,
  onDateSelect,
}: {
  onChipClick: (time: string) => void;
  onDateSelect: (date: Date) => void;
}) {
  const [firstTurn, setFirstTurn] = useState(false);
  const [selectTurn, setSelectTurn] = useState(false);
  const [dateSelected, setDateSelected] = useState<Date | null>(null);

  const handleDateSelect = (date: Date | null) => {
    if (date) {
      setDateSelected(date);
      onDateSelect(date); // Notifica a MyDates sobre la fecha seleccionada
    }
  };

  const handleChange = () => {
    setFirstTurn(!firstTurn);
    setSelectTurn(false);
  };

  return (
    <article className="flex flex-col justify-center w-full p-4 gap-8">
      <div>
        <h1 className="text-[#A1A1A1] m-4">Tu profesional elegido es:</h1>
        <div className="w-[342px] shadow rounded-lg border flex p-2 px-4 items-center border-[#E5E7EB] gap-4">
          <img
            src="public/Imágenes/miguel.png"
            alt="Foto del profesional"
            className="size-10 bg-[#989898] rounded-full"
          />
          <div className="flex flex-col justify-center">
            <h2 className="text-lg font-bold">Lic. Kevin Jefe</h2>
            <h3 className="text-[#4A4A4A]">Terapia Cognitiva</h3>
          </div>
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer w-full justify-center">
        <span
          className={`text-gray-800 font-medium w-60 text-start ${
            firstTurn && "text-emerald-500"
          }`}
        >
          {firstTurn
            ? "Primer turno disponible"
            : "Ver primer turno disponible"}
        </span>
        <input
          type="checkbox"
          checked={firstTurn}
          onChange={() => handleChange()}
          className="hidden"
        />
        <span
          className={`w-12 h-6 flex items-center flex-shrink-0 p-1 bg-gray-400 rounded-full duration-300 ease-in-out ${
            firstTurn ? "bg-lime-600" : "bg-gray-400"
          }`}
        >
          <span
            className={`h-4 w-4 bg-white rounded-full shadow-md transform duration-300 ease-in-out ${
              firstTurn ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </span>
      </label>
      <section className="w-full flex justify-center">
        {firstTurn ? (
          <div className="rounded w-[340px] h-28 bg-gray-50 border border-[#CCCCCC] flex flex-col items-center p-4 gap-4">
            <h2 className="text-[#737373] font-semibold">
              Lunes 2 de diciembre
            </h2>
            <div className="flex justify-evenly w-full">
              <Chip time="8:00" onClick={onChipClick} />
              <Chip time="12:00" onClick={onChipClick} />
              <Chip time="14:00" onClick={onChipClick} />
            </div>
          </div>
        ) : (
          <button
            onClick={() => setSelectTurn(true)}
            className="bg-gray-100 h-10 w-80 flex items-center justify-center text-center relative rounded-lg"
          >
            <img
              src="public/Íconos/MisCitas.png"
              alt="Icono de agendar turno"
              className="w-5 absolute left-8"
            />
            <p>Seleccionar mi turno</p>
          </button>
        )}
      </section>
      {selectTurn && <MonthCalendar onDateSelect={handleDateSelect} />}
      {dateSelected && selectTurn && (
        <div className="grid grid-cols-3 gap-2 gap-y-4 w-full items-center place-items-center">
          <Chip time="8:00" onClick={onChipClick} />
          <Chip time="12:00" onClick={onChipClick} />
          <Chip time="14:00" onClick={onChipClick} />
          <Chip time="16:00" onClick={onChipClick} />
          <Chip time="18:00" onClick={onChipClick} />
          <Chip time="20:00" onClick={onChipClick} />
        </div>
      )}
    </article>
  );
}

export default SelectDay;
