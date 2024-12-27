import React from 'react';

interface MessageListProps {
  theme: 'light' | 'dark';
  messages?: { sender?: string; message?: string; type?: 'notification' | 'message'; content?: string }[];
}

const MessageList: React.FC<MessageListProps> = ({ theme, messages }) => {
  return (
    <div className="space-y-2">
      {messages?.map((msg, index) => (
        <div key={index} className="rounded-md p-3 shadow-sm">
          {msg.type === 'notification' ? (
            <div
              className={`text-center italic ${
                theme === 'dark' ? 'text-yellow-400' : 'text-gray-600'
              }`}
            >
              {msg.message || msg.content}
            </div>
          ) : (
            <div
              className={`${
                theme === 'dark'
                  ? 'bg-gray-800 text-gray-100'
                  : 'bg-gray-200 text-gray-900'
              } rounded-md p-3`}
            >
              <strong className="block">{msg.sender}</strong>
              <span>{msg.message}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
