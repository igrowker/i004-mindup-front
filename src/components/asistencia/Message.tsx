interface messageProps {
  text: string;
  user: string;
  id: number;
}

function Message({ text, user, id }: messageProps) {
  return <div
  key={id}
  className={`flex ${
    user === "user" ? "justify-end" : "justify-start"
  }`}
> 
  <div
    className={`rounded-2xl px-4 py-2 max-w-[80%] ${
      user === "user"
        ? "bg-[#7a5fe7] text-white rounded-tr-none"
        : "bg-white text-black rounded-tl-none shadow-sm border"
    }`}
  >
    {text}
  </div>
</div>;
}

export default Message;
