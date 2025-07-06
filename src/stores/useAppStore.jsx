import { create } from 'zustand';

// 인증상태 저장
const useAppStore = create((set) => ({
  isPasswordVerified: false,
  setPasswordVerified: (value) => set({ isPasswordVerified: value }),
}));

export default useAppStore;
