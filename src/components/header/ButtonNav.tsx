import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

interface ButtonNavProps {
  label: string;
  Icon: React.ElementType | string;
}

function ButtonNav({ label, Icon }: ButtonNavProps) {
  return (
    <button className="flex ml-2 items-center justify-between w-full text-gray-800">
      <div className="flex gap-2 justify-center items-center text-base font-medium">
        {typeof Icon === "string" ? (
          <img src={Icon} alt={`${label} icon`} className="w-5" />
        ) : (
          <Icon className="size-5" />
        )}
        <p>{label}</p>
      </div>
      <MdKeyboardArrowRight size={24} />
    </button>
  );
}

export default ButtonNav;
