import React, { useState } from "react";

interface InputTextProps {
  name: string;
  placeholder: string;
}

function InputPassword({ name, placeholder }: InputTextProps) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassowrdVisibility = () => setShowPassword(!showPassword);
  return (
    <div>
      <label htmlFor={name} className="block font-bold my-1">
        {name}
      </label>

      <input
        type={showPassword ? "text" : "password"}
        id={name}
        name={name}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border-[#cfd0d2] border-[1px] py-2 px-2 "
      />
      <button
        type="button"
        className="absolute right-14 mt-3 text-gray-500"
        onClick={togglePassowrdVisibility}
      >
        {showPassword ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-eye"
          >
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-eye-off"
          >
            <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
            <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
            <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
            <path d="m2 2 20 20" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default InputPassword;
