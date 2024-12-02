interface ButtonData {
    title: string;
    appearance?: boolean;
    type?: "button" | "submit" | "reset"; // Define los valores permitidos para `type`
    onClick?: () => void;
}

function CustomButtonSmall({ title, appearance, type = "button", onClick, }: ButtonData): JSX.Element {
    const commonClasses = 
        "w-24 text-center text-sm rounded border py-1 focus:outline-none focus:ring";
    const primaryClasses =
        "border-[#7a5fe7] bg-[#7a5fe7] text-white hover:bg-transparent hover:text-[#7a5fe7] active:text-[#7a5fe7]";
    const secondaryClasses =
        "border-[#7a5fe7] text-[#7a5fe7] hover:bg-[#7a5fe7] hover:text-white active:bg-[#7a5fe7]";

    return (
        <button
            className={`${commonClasses} ${appearance ? primaryClasses : secondaryClasses
                }`}
            type={type} // Usa el tipo que recibe como prop
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

export default CustomButtonSmall;
