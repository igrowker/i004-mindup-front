import React from 'react';

interface MessageProps {
  text: string;
  user: boolean;
  id: number;
}

const Message: React.FC<MessageProps> = ({ text, user, id }) => {
  
  return (
    <div
      key={id}
      className={`flex ${user ? "justify-end" : "justify-start"} mb-3`}
    >
      <div className={`relative max-w-[70%] ${user ? "mr-2" : "ml-2"}`}>
        <div 
          className={`relative px-4 py-2 ${
            user  
              ? "bg-[#6C5CE7] text-white" 
              : "bg-white text-zinc-900 border border-zinc-200"
          }`}
          style={{
            borderRadius: '18px',
            ...(user
              ? { borderTopRightRadius: '4px' } 
              : { borderTopLeftRadius: '4px' }),
          }}
        >
          <p className="text-[15px] leading-[1.3] relative z-10">{text}</p>
        </div>
        <div
          className={`absolute top-0 w-4 h-4 ${user ? "right-[-13px]" : "left-[-13px]"}`}
          style={{
            overflow: 'hidden',
            width: '26px',
            height: '20px',
          }}
        >
          <div 
            className={`absolute ${
              user
                ? "bg-[#6C5CE7]" 
                : "bg-white border-t border-l border-zinc-200"
            }`}
            style={{
              transform: user ? 'skew(-40deg)' : 'skew(40deg)',
              width: '20px',
              height: '20px',
              ...(user
                ? { right: '6px' } 
                : { left: '6px' }),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Message;

