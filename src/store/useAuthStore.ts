import { create } from 'zustand';

// あとで中身を書くための準備
export const useAuthStore = create((set) => ({
  user: null,
  // ...
}));