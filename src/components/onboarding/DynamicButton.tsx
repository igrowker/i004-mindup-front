interface DynamicButtonProps {
  buttonText: string;
  onClick: () => void;
  bgColor: string;
  textColor: string;
  border?: string;
  className?: string;
  disabled?: boolean;
  icon?: string;
  isSelected?: boolean; // Nuevo prop
}

const DynamicButton: React.FC<DynamicButtonProps> = ({
  buttonText,
  onClick,
  bgColor,
  textColor,
  border,
  className = "",
  disabled,
  icon,
  isSelected = false, // Valor por defecto
}) => {
  const isGif = icon?.endsWith(".gif"); // Verifica si el ícono es un GIF

  return (
    <>
      {icon ? (
        <button
          disabled={disabled}
          className={`py-4 w-full px-6 rounded-md text-lg text-left relative bg-background text-secondary ${border} ${className} ${isGif && isSelected ? "brightness-75" : "brightness-100"}`}
          onClick={onClick}
        >
          {buttonText}
          <img
            className={`absolute size-12 top-1 right-4`}
            src={`/Gifs/${icon}`}
            alt={`${buttonText} icon`}
          />
        </button>
      ) : (
        <button
          disabled={disabled}
          className={`py-2 w-full px-6 rounded-md text-lg relative ${bgColor} ${textColor} ${border} ${className}`}
          onClick={onClick}
        >
          {buttonText}
        </button>
      )}
    </>
  );
};

export default DynamicButton;
