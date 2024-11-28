import { useState } from "react";

interface InputSelectProps {
  title: string;
  options: { label: string; value: string }[]; // Cambiar a un arreglo de objetos con etiqueta y valor
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const InputGender: React.FC<InputSelectProps> = ({
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
    <div>
      <label htmlFor={title} className="block font-bold my-1">
        {title}
      </label>
      <select
        name={title}
        id={title}
        value={selectedValue}
        onChange={handleChange}
        className="mt-1 w-full rounded-md border-[#cfd0d2] border-[1px] py-2 px-2  text-gray-900"
      >
        <option value="" disabled hidden>
          {title}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label} {/* Mostrar la etiqueta en español */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputGender;
