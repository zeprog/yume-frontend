import { create } from 'zustand';

export interface RoomMessage {
  sender?: string;
  message?: string;
  type?: 'notification' | 'message';
  timestamp?: number; 
  content?: string;
}

interface RoomState {
  participants: string[];
  messages: RoomMessage[];

  setParticipants: (participants: string[]) => void;
  addMessage: (msg: RoomMessage) => void;
  clearRoom: () => void;
}

const useRoomStore = create<RoomState>((set) => ({
  participants: [],
  messages: [],

  setParticipants: (participants) => {
    set({ participants });
  },

  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),

  clearRoom: () =>
    set({
      participants: [],
      messages: [],
    }),   
}));

export default useRoomStore;
