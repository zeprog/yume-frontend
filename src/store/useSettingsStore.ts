import { create } from 'zustand';

interface SettingsState {
  theme: 'light' | 'dark';
  nickname: string;
  setTheme: (theme: 'light' | 'dark') => void;
  setNickname: (nickname: string) => void;
}

const useSettingsStore = create<SettingsState>((set) => ({
  theme: 'light',
  nickname: 'Anonymous',

  setTheme: (theme) => set({ theme }),
  setNickname: (nickname) => set({ nickname }),
}));

export default useSettingsStore;
