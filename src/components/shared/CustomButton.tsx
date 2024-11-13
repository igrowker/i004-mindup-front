import React from "react";

interface ButtonData {
  title: string;
  appearance?: boolean;
  type?: string;
  onClick?: () => void;
}

function CustomButton({ title, type, appearance }: ButtonData): JSX.Element {
  return (
    <>
      {appearance == true ? (
        <a
          className="inline-block text-center rounded border border-indigo-600 bg-indigo-600 px-12 py-3  font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          href="#"
        >
          {title}
        </a>
      ) : (
        <a
          className="inline-block text-center rounded border border-indigo-600 px-12 py-3  font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
          href="#"
        >
          {title}
        </a>
      )}
    </>
  );
}

export default CustomButton;
