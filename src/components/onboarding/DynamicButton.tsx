interface DynamicButtonProps {
  buttonText: string;
  onClick: () => void;
  bgColor: string;
  textColor: string;
  border?: string;
  className?: string;
  disabled?: boolean;
}

const DynamicButton: React.FC<DynamicButtonProps> = ({
  buttonText,
  onClick,
  bgColor,
  textColor,
  border,
  className = '',
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      className={`py-2 w-full px-6 rounded-md text-lg ${bgColor} ${textColor} ${border} ${className}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default DynamicButton;
