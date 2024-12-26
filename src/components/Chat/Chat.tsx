import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

interface ChatProps {
  theme: 'light' | 'dark';
  messages: { sender?: string; message: string; type?: 'notification' | 'message' }[];
  onSendMessage: (message: string) => void;
}

// const Chat: React.FC<ChatProps> = ({ theme, messages, onSendMessage }) => {
//   return (
//     <div
//       className={`w-1/4 flex flex-col h-screen p-4 border-r ${
//         theme === 'dark'
//           ? 'bg-gray-900 text-gray-100 border-gray-700'
//           : 'bg-gray-100 text-gray-800 border-gray-300'
//       }`}
//     >
//       <h3 className="text-lg font-bold mb-4">
//         Chat
//       </h3>
//       <div className="flex-grow overflow-y-auto custom-scrollbar">
//         <MessageList theme={theme} messages={messages} />
//       </div>
//       <div className="mt-4">
//         <MessageInput onSendMessage={onSendMessage} theme={theme} />
//       </div>
//     </div>
//   );
// };

const Chat: React.FC<ChatProps> = ({ theme, messages, onSendMessage }) => {
  return (
    <div
      className={`w-1/3 flex flex-col h-screen p-6 ${
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
