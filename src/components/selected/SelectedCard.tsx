import React from 'react';

type CardProps = {
  name: string;
  type: string;
};

const SelectedCard: React.FC<CardProps> = ({ name, type }) => {
  return (
    <div className="w-[342px] rounded-lg border flex p-2 px-4 items-center border-[#E5E7EB] gap-4">
      <img
        src=""
        alt="Foto del profesional"
        className="size-10 bg-[#989898] rounded-full"
      />
      <div className="flex flex-col justify-center">
        <h2 className="text-lg font-bold">Lic. {name}</h2>
        <h3 className="text-[#4A4A4A]">Terapia {type}</h3>
      </div>
    </div>
  );
};

export default SelectedCard;
