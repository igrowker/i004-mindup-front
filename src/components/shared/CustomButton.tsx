import React from "react";

interface ButtonData {
  title: string;
  appearance?: boolean;
  type?: string;
  onClick?: () => void;
}

function CustomButton({ title, type, appearance, onClick }: ButtonData): JSX.Element {
  return (
    <>
      {appearance == true ? (
        <a
          className="inline-block text-center rounded border border-[#7a5fe7] bg-[#7a5fe7] px-24 py-3 min-w-56 font-medium text-white hover:bg-transparent hover:text-[#7a5fe7] focus:outline-none focus:ring active:text-[#7a5fe7]"
          href="#"
          onClick={(e) => {
            e.preventDefault(); // Evita que el enlace navegue
            if (onClick) onClick(); // Ejecuta la función onClick si está presente
          }}
        >
          {title}
        </a>
      ) : (
        <a
          className="inline-block text-center rounded border border-[[#7a5fe7]] px-24 py-3 font-medium text-[#7a5fe7] hover:bg-[#7a5fe7] hover:text-white focus:outline-none focus:ring active:bg-[#7a5fe7]"
          href="#"
          onClick={(e) => {
            e.preventDefault(); // Evita que el enlace navegue
            if (onClick) onClick(); // Ejecuta la función onClick si está presente
          }}
        >
          {title}
        </a>
      )}
    </>
  );
}

export default CustomButton;
