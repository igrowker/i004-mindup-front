function Chip({
  time,
  onClick,
}: {
  time: string;
  onClick: (time: string) => void;
}) {
  return (
    <button
      className="w-[50px] h-6 bg-sky-400 rounded-lg text-gray-50 text-base active:bg-[#4D94F5]"
      onClick={() => onClick(time)}
    >
      {time}
    </button>
  );
}

export default Chip;
