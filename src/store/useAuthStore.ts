import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  // 1. プロフィール更新用のアクションを追加
  updateProfile: (newName: string) => void; 
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  // 2. 実装：既存のuser情報をコピーしつつ、nameだけ上書きする
  updateProfile: (newName) => set((state) => ({
    user: state.user ? { ...state.user, name: newName } : null
  })),
}));