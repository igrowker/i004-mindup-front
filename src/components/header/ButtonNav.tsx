import React from "react";
import { FaAngleRight } from "react-icons/fa";

interface ButtonNavProps {
  label: string;
  Icon: React.ElementType;
}
function ButtonNav({ label, Icon }: ButtonNavProps) {
  return (
    <button className="flex items-center justify-between w-full px-5">
      <div className="flex gap-2 justify-center items-center">
        <Icon className="size-4"/>
        <p>{label}</p>
      </div>
      <FaAngleRight />
    </button>
  );
}

export default ButtonNav;
