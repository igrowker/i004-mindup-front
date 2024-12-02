import React, { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";

type CardProps = {
  day: string;
  timeRange: string;
  psycho?: string;
  consultationType?: string;
  accepted?: boolean;
};

const DateCard: React.FC<CardProps> = ({
  day,
  timeRange,
  psycho = "",
  accepted = false,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative border border-zinc-200 rounded-md h-[68px] py-2 px-4 w-[343px] flex items-center gap-2">
      <header className="h-full flex justify-center items-center">
        {accepted ? (
          <img
            className="w-6 h-6"
            src="public/Íconos/DobleConfirmación.svg"
            alt="Icono de confirmacion"
          />
        ) : (
          <div />
        )}
      </header>
      <div className="h-full flex flex-col justify-center flex-grow">
        <h3 className="text-secondary font-bold">
          {day}, {timeRange}
        </h3>
        {psycho && <p className="text-sm text-[#444444]">{psycho}</p>}
      </div>
      <button
        className="ml-auto"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
      >
        <IoChevronDownSharp className="size-4 text-[#85868B]" />
      </button>
      {isMenuOpen && (
        <ul className="absolute right-0 top-[72px] bg-white border border-zinc-200 rounded-md shadow-lg w-[343px] z-10">
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Cancelar
          </li>
        </ul>
      )}
    </div>
  );
};

export default DateCard;
