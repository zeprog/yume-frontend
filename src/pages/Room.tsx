import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSocket } from '../hooks/useSocket';
import Chat from '../components/Chat/Chat';
import SettingsButton from '../components/Chat/SettingsButton';

const Room: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [participants, setParticipants] = useState<string[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [nickname, setNickname] = useState('Anonymous');
  const [messages, setMessages] = useState<{ sender?: string; message: string; type?: 'notification' | 'message' }[]>([]);
  const { sendMessage, onMessage } = useSocket('http://localhost:3000');
  const navigate = useNavigate();

  useEffect(() => {
    onMessage('participants-updated', (data) => {
      setParticipants(data.participants);
    });

    onMessage('nickname-assigned', (data) => {
      setNickname(data.nickname);
    });

    onMessage('receiveMessage', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    sendMessage('joinRoom', { roomId });

    return () => {
      sendMessage('leaveRoom', { roomId });
    };
  }, [roomId]);

  useEffect(() => {
    onMessage('error', (error) => {
      console.error('Error received:', error.message);
      navigate('/');
    });
  }, [onMessage]);

  const handleSendMessage = (message: string) => {
    sendMessage('sendMessage', { roomId, message });
  };

  const handleNicknameChange = (newNickname: string) => {
    setNickname(newNickname);
    sendMessage('changeNickname', { nickname: newNickname });
  };

  const handleLeaveRoom = () => {
    sendMessage('leaveRoom', { roomId });
    navigate('/');
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <header className="p-4 border-b border-gray-700 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Room: <span className="text-yellow-500">{roomId}</span>
        </h1>
        <SettingsButton
          currentNickname={nickname}
          onNicknameChange={handleNicknameChange}
          onThemeChange={setTheme}
          onLeaveRoom={handleLeaveRoom}
          theme={theme}
        />
      </header>
      <main className="flex flex-grow">
        <Chat theme={theme} messages={messages} onSendMessage={handleSendMessage} />
        <div
          className={`flex-grow p-6 ${
            theme === 'dark'
              ? 'bg-gray-800 border-l border-gray-700'
              : 'bg-white border-l border-gray-300'
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">Participants</h2>
          <ul className="space-y-2">
            {participants.map((participant) => (
              <li key={participant} className="text-lg font-medium text-yellow-400">
                {participant}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Room;


// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useSocket } from '../hooks/useSocket';
// import Chat from '../components/Chat/Chat';
// import SettingsButton from '../components/Chat/SettingsButton';

// const Room: React.FC = () => {
//   const { roomId } = useParams<{ roomId: string }>();
//   const [participants, setParticipants] = useState<string[]>([]);
//   const [theme, setTheme] = useState<'light' | 'dark'>('light');
//   const [nickname, setNickname] = useState('Anonymous');
//   const [messages, setMessages] = useState<{ sender?: string; message: string; type?: 'notification' | 'message' }[]>([]);
//   const { sendMessage, onMessage } = useSocket('http://localhost:3000');
//   const navigate = useNavigate();

//   useEffect(() => {
//     onMessage('participants-updated', (data) => {
//       setParticipants(data.participants);
//     });

//     onMessage('nickname-assigned', (data) => {
//       setNickname(data.nickname);
//     });

//     onMessage('receiveMessage', (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     sendMessage('joinRoom', { roomId });

//     return () => {
//       sendMessage('leaveRoom', { roomId });
//     };
//   }, [roomId]);

//   useEffect(() => {
//     onMessage('error', (error) => {
//       console.error('Error received:', error.message);
//       navigate('/');
//     });
//   }, [onMessage]);

//   const handleSendMessage = (message: string) => {
//     sendMessage('sendMessage', { roomId, message });
//   };

//   const handleNicknameChange = (newNickname: string) => {
//     setNickname(newNickname);
//     sendMessage('changeNickname', { nickname: newNickname });
//   };

//   const handleLeaveRoom = () => {
//     sendMessage('leaveRoom', { roomId });
//     navigate('/');
//   };

//   return (
//     <div className={`min-h-screen flex relative ${
//       theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
//     }`}>
//       <SettingsButton
//         currentNickname={nickname}
//         onNicknameChange={handleNicknameChange}
//         onThemeChange={setTheme}
//         onLeaveRoom={handleLeaveRoom}
//         theme={theme}
//       />
//       <Chat theme={theme} messages={messages} onSendMessage={handleSendMessage} />
//       <div
//         className={`flex-grow p-4 ${
//           theme === 'dark'
//             ? 'bg-gray-800 text-gray-100 border-l border-gray-700'
//             : 'bg-white text-gray-800 border-l border-gray-300'
//         }`}
//       >
//         <h1 className="text-3xl font-bold mb-4">Room ID: {roomId}</h1>
//         <h2 className="text-2xl font-semibold mb-4">Participants</h2>
//         <ul className="space-y-2">
//           {participants.map((participant) => (
//             <li key={participant} className="text-gray-300">
//               {participant}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Room;
