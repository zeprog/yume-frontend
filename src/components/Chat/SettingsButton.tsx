import React, { useState, useEffect } from 'react';
import useSettingsStore from '../../store/useSettingsStore';
import Modal from '../Modal';
import { useSocket } from '../../hooks/useSocket';
import useRoomStore, { RoomMessage } from '../../store/useRoomStore';
import { useParams } from 'react-router-dom';

interface SettingsButtonProps {
  onLeaveRoom: () => void;
  className?: string;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ onLeaveRoom, className }) => {
  const { roomId } = useParams();
  const { theme, nickname, setTheme, setNickname } = useSettingsStore();
  const { sendMessage, offMessage } = useSocket('http://localhost:3000');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNickname, setNewNickname] = useState(nickname);
  const addMessage = useRoomStore((state) => state.addMessage);

  useEffect(() => {
    setNewNickname(nickname);
  }, [nickname]);

  const handleSaveNickname = () => {
    if (!roomId || !newNickname.trim()) {
      alert('Room ID and nickname must not be empty.');
      return;
    }

    const oldNickname = nickname;
    sendMessage('updateNickname', { roomId, nickname: newNickname });

    const handleNicknameUpdated = (data: { nickname: string }) => {
      setNickname(data.nickname);
      const systemMessage: RoomMessage = {
        type: 'notification',
        content: `${oldNickname} сменил ник на ${data.nickname}.`,
      };
      addMessage(systemMessage);
    };

    offMessage('nickname-updated', handleNicknameUpdated);
  };

  return (
    <div className={className}>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-yellow-500 text-gray-900 rounded-full p-2 hover:bg-yellow-600 transition focus:outline-none"
      >
        ⚙️
      </button>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} theme={theme}>
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Change Nickname</label>
            <input
              type="text"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              className={`w-full p-2 rounded-md ${
                theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
              }`}
            />
            <button
              onClick={handleSaveNickname}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
          <div>
            <button
              onClick={() => setTheme('light')}
              className="mr-2 px-4 py-2 rounded-md bg-gray-200 text-black"
            >
              Light Theme
            </button>
            <button
              onClick={() => setTheme('dark')}
              className="px-4 py-2 rounded-md bg-gray-800 text-white"
            >
              Dark Theme
            </button>
          </div>
          <button
            onClick={onLeaveRoom}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            Leave Room
          </button>
        </Modal>
      )}
    </div>
  );
};

export default SettingsButton;
