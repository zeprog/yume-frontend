import React, { useState } from 'react';import InputField from '../ui/InputField';
import Button from '../ui/Button';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  theme: 'light' | 'dark';
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, theme = 'light' }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex items-center space-x-4 mt-4">
      <InputField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type your message..."
        className="flex-grow"
        theme={theme}
      />
      <Button
        onClick={handleSendMessage}
        variant="gradient"
        size="medium"
      >
        Send
      </Button>
    </div>
  );
};

export default MessageInput;
