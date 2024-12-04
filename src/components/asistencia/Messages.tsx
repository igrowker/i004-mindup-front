import Message from "./Message";

interface MessagesProps {
  messages: any[];
}

export default function Messages({ messages }: MessagesProps) {
  

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((messag) => (
        <Message
          key={messag.id}
          text={messag.text}
          user={messag.sender}
          id={messag.id}
        />
      ))}
    </div>
  );
}
