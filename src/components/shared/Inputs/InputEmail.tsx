interface InputEmailProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputEmail({ name, placeholder, onChange,value }: InputEmailProps) {
  return (
    <div>
      <label htmlFor={name} className="block font-bold my-1">
        {name}
      </label>
      <input
        type="email"
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={onChange} 
        value={value}
        className="mt-1 w-full rounded-md border-[#cfd0d2] border-[1px] py-2 px-2"
      />
    </div>
  );
}

export default InputEmail;
