import { useEffect, useRef, useState } from 'react';

interface WebRTCConfig {
  roomId: string;
  onRemoteStream: (stream: MediaStream) => void;
}

export const useWebRTC = ({ roomId, onRemoteStream }: WebRTCConfig) => {
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const localStream = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      peerConnection?.close();
      setPeerConnection(null);
    };
  }, [peerConnection]);

  const startCall = async () => {
    if (!peerConnection) {
      const pc = new RTCPeerConnection();
      pc.ontrack = (event) => {
        const [remoteStream] = event.streams;
        onRemoteStream(remoteStream);
      };
      setPeerConnection(pc);
    }

    if (!localStream.current) {
      localStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStream.current.getTracks().forEach((track) => {
        peerConnection?.addTrack(track, localStream.current!);
      });
    }

    const offer = await peerConnection?.createOffer();
    await peerConnection?.setLocalDescription(offer!);
    return localStream.current;
  };

  const endCall = () => {
    localStream.current?.getTracks().forEach((track) => track.stop());
    peerConnection?.close();
    setPeerConnection(null);
  };

  const setupWebRTC = () => {
    console.log('Setting up WebRTC for room:', roomId);
  };

  return { startCall, endCall, setupWebRTC };
};
