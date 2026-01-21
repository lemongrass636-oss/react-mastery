import { create } from 'zustand';

// ユーザー情報の型定義
interface User {
  id: string;
  name: string;
  email: string;
}

// 投稿情報の型定義
interface Post {
  id: string;
  authorName: string;
  content: string;
  createdAt: string;
}

// ストア全体の型定義
interface AuthState {
  // 状態（State）
  user: User | null;
  isAuthenticated: boolean;
  posts: Post[];

  // アクション（関数）
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (newName: string) => void;
  addPost: (content: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // --- 初期状態 ---
  user: null,
  isAuthenticated: false,
  // 最初に見栄えが良いようにサンプル投稿を1つ入れておきます
  posts: [
    { 
      id: '1', 
      authorName: 'System', 
      content: 'Welcome to your new dashboard! Try posting something above.', 
      createdAt: new Date().toLocaleTimeString() 
    }
  ],

  // --- ログイン・ログアウト ---
  login: (user) => set({ 
    user, 
    isAuthenticated: true 
  }),

  logout: () => set({ 
    user: null, 
    isAuthenticated: false 
  }),

  // --- プロフィール更新 ---
  // 現在のユーザー情報をコピーしつつ、名前だけを上書きします
  updateProfile: (newName) => set((state) => ({
    user: state.user ? { ...state.user, name: newName } : null
  })),

  // --- 新規投稿追加 ---
  // 新しい投稿を配列の先頭（インデックス0）に追加することで、最新の投稿が上にくるようにします
  addPost: (content) => set((state) => ({
    posts: [
      {
        id: Date.now().toString(), // 簡易的な一意のID
        authorName: state.user?.name || 'Anonymous',
        content,
        createdAt: new Date().toLocaleTimeString(),
      },
      ...state.posts, // 既存の投稿を後ろに展開
    ]
  })),
}));