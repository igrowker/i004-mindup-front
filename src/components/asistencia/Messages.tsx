import Message from "./Message";


interface MessagesProps {
  messages: Array<{ id: number; text: string; sender: string }>;
}

export default function Messages({ messages }: MessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <Message
          key={message.id}
          text={message.text}
          user={message.sender}
          id={message.id}
        />
      ))}
    </div>
  );
}
