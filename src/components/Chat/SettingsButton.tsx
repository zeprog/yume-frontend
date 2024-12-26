import React, { useState } from 'react';
import Modal from '../Modal';
import InputField from '../ui/InputField';
import Button from '../ui/Button';

interface SettingsButtonProps {
  onNicknameChange: (newNickname: string) => void;
  onThemeChange: (theme: 'light' | 'dark') => void;
  onLeaveRoom: () => void;
  theme: 'light' | 'dark';
  currentNickname: string;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({
  onNicknameChange,
  onThemeChange,
  onLeaveRoom,
  theme = 'dark',
  currentNickname
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nickname, setNickname] = useState(currentNickname);
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>('light');

  const handleNicknameSave = () => {
    if (nickname.trim()) {
      onNicknameChange(nickname);
      setIsModalOpen(false);
    }
  };

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setSelectedTheme(theme);
    onThemeChange(theme);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-yellow-500 text-gray-900 rounded-full p-2 hover:bg-yellow-600 transition focus:outline-none"
      >
        ⚙️
      </button>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          theme={theme}
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Change Nickname</label>
              <InputField
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter new nickname"
                theme={theme}
              />
              <Button onClick={handleNicknameSave}>Send</Button>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Change Theme</label>
              <div className="flex space-x-4">
                <Button
                  onClick={() => onThemeChange('light')}
                  variant={theme === 'light' ? 'solid' : 'outline'}
                >Light</Button>
                <Button
                  onClick={() => onThemeChange('dark')}
                  variant={theme === 'dark' ? 'solid' : 'outline'}
                >Dark</Button>
              </div>
            </div>
            <Button onClick={onLeaveRoom} variant="solid">Leave Room</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SettingsButton;
