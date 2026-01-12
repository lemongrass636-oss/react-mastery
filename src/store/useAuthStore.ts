import { create } from 'zustand';

// ユーザー情報の型定義
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
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  // ログインアクション
  login: (user) => set({ user, isAuthenticated: true }),
  // ログアウトアクション
  logout: () => set({ user: null, isAuthenticated: false }),
}));