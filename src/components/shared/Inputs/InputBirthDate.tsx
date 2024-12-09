import React from "react";

interface InputBirthDateProps {
    name: string;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBirthDate: React.FC<InputBirthDateProps> = ({
    name,
    placeholder,
    value,
    onChange,
}) => {
    return (
        <div>
            <label htmlFor={name} className="block font-bold my-1">
                {name}
            </label>
            <input
                type="date"
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="mt-1 w-full rounded-md border-[#cfd0d2] border-[1px] py-2 px-2"
                pattern="\d{4}-\d{2}-\d{2}"
            />
        </div>
    );
};

export default InputBirthDate;