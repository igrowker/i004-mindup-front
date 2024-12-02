interface ButtonData {
  title: string;
  appearance?: boolean;
  option?: boolean;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  onClick?: () => void;
}

function CustomButton({ title, appearance, option, loading, type = "button", onClick, }: ButtonData): JSX.Element {
  const commonClasses = option ?
    "w-24 text-center rounded border px-4 py-3 font-medium focus:outline-none focus:ring"
    :
    "inline-block w-[290px] text-center rounded border px-3 py-3 font-medium focus:outline-none focus:ring shadow";
  const primaryClasses =
    "border-[#7a5fe7] bg-[#7a5fe7] text-white hover:bg-transparent hover:text-[#7a5fe7] active:text-[#7a5fe7]";
  const secondaryClasses =
    "border-[#7a5fe7] text-[#7a5fe7] hover:bg-[#7a5fe7] hover:text-white active:bg-[#7a5fe7]";

  return (
    <button
      className={`${commonClasses} ${appearance ? primaryClasses : secondaryClasses
        }`}
      type={type} // Usa el tipo que recibe como prop
      disabled={loading}
      onClick={(e) => {
        if (type !== "submit") {
          e.preventDefault(); // Solo previene si no es `submit`
        }
        if (onClick) onClick(); // Llama a la función `onClick` si está definida
      }}
    >
      {title}
    </button>
  );
}

export default CustomButton;
