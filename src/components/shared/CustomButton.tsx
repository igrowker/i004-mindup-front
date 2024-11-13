interface ButtonData {
  title: string;
  appearance?: boolean;
  type?: string;
  onClick?: () => void;
}

function CustomButton({ title, appearance, onClick }: ButtonData): JSX.Element {
  const commonClasses = "inline-block text-center rounded border px-24 py-3 font-medium focus:outline-none focus:ring";
  const primaryClasses = "border-[#7a5fe7] bg-[#7a5fe7] text-white hover:bg-transparent hover:text-[#7a5fe7] active:text-[#7a5fe7]";
  const secondaryClasses = "border-[#7a5fe7] text-[#7a5fe7] hover:bg-[#7a5fe7] hover:text-white active:bg-[#7a5fe7]";

  return (
    <a
      className={`${commonClasses} ${appearance ? primaryClasses : secondaryClasses}`}
      href="#"
      onClick={(e) => {
        e.preventDefault(); // Evita que el enlace navegue
        if (onClick) onClick(); // Ejecuta la función onClick si está presente
      }}
    >
      {title}
    </a>
  );
}

export default CustomButton;
