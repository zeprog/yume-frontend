import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import type { RoomMessage } from '../../store/useRoomStore'; 

interface ChatProps {
  theme: 'light' | 'dark';
  messages: RoomMessage[];
  onSendMessage: (message: string) => void;
}

const Chat: React.FC<ChatProps> = ({ theme, messages, onSendMessage }) => {
  return (
    <div
      className={`w-1/4 flex flex-col h-screen p-6 ${
        theme === 'dark'
          ? 'bg-gray-900 text-gray-100 border-r border-gray-700'
          : 'bg-gray-100 text-gray-900 border-r border-gray-300'
      }`}
    >
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <span className="mr-2 text-yellow-400">💬</span> Chat
      </h3>
      <div className="flex-grow overflow-y-auto space-y-4">
        <MessageList theme={theme} messages={messages} />
      </div>
      <MessageInput onSendMessage={onSendMessage} theme={theme} />
    </div>
  );
};

export default Chat;
