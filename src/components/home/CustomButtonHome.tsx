interface ButtonData {
  title: string;
  icon: string;
  type?: "button" | "submit" | "reset"; // Define los valores permitidos para `type`
  onClick?: () => void;
}

function CustomButtonHome({
  title,
  icon,
  type = "button",
  onClick,
}: ButtonData): JSX.Element {
  return (
    <button
      className="relative flex items-center justify-center w-80 rounded bg-gray-100 px-3 py-3 font-medium text-sm"
      type={type} // Usa el tipo que recibe como prop
      onClick={(e) => {
        if (type !== "submit") {
          e.preventDefault(); // Solo previene si no es `submit`
        }
        if (onClick) onClick(); // Llama a la función `onClick` si está definida
      }}
    >
      <img
        className="absolute left-8 size-5"
        src={`public/Íconos/${icon}`}
        alt="Icono del boton"
      />
      {title}
    </button>
  );
}

export default CustomButtonHome;
