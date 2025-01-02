import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import SettingsButton from './SettingsButton';
import type { RoomMessage } from '../../store/useRoomStore';

interface ChatProps {
  theme: 'light' | 'dark';
  messages: RoomMessage[];
  onSendMessage: (message: string) => void;
  onLeaveRoom: () => void;
}

const Chat: React.FC<ChatProps> = ({ theme, messages, onSendMessage, onLeaveRoom }) => {
  return (
    <div
      className={`w-1/4 flex flex-col h-screen relative ${
        theme === 'dark'
          ? 'bg-gray-900 text-gray-100 border-r border-gray-700'
          : 'bg-gray-100 text-gray-900 border-r border-gray-300'
      }`}
    >
      {/* Кнопка настроек */}
      <SettingsButton onLeaveRoom={onLeaveRoom} className="absolute top-4 right-4" />

      <header className="flex items-center justify-between p-4 border-b">
        <h3 className="text-xl font-semibold flex items-center">
          <span className="mr-2 text-yellow-400">💬</span> Chat
        </h3>
      </header>
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        <MessageList theme={theme} messages={messages} />
      </div>
      <footer className="p-4 border-t">
        <MessageInput onSendMessage={onSendMessage} theme={theme} />
      </footer>
    </div>
  );
};

export default Chat;