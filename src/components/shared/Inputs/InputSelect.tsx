import { useState } from "react";

interface InputSelectProps {
  title: string;
  options: string[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const InputSelect: React.FC<InputSelectProps> = ({
  title,
  options,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    onChange(event); // Llama a la función onChange pasada como prop
  };

  return (
    <label htmlFor={title} className="block font-medium mx-16">
      <select
        name={title}
        id={title}
        value={selectedValue}
        onChange={handleChange}
        className="relative w-[200px] block rounded-md border-2 p-1 border-gray-200 text-black"
      >
        <option value="" disabled hidden>
          {title}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="text-center text-black">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default InputSelect;
