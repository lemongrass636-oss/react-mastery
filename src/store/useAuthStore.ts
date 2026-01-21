import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  likes: number; // 追加：いいね数
}

// ストア全体の型定義
interface AuthState {
  // 状態
  user: User | null;
  isAuthenticated: boolean;
  posts: Post[];

  // アクション
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (newName: string) => void;
  addPost: (content: string) => void;
  deletePost: (id: string) => void;
  toggleLike: (id: string) => void; // 追加：いいね切り替え
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // --- 初期状態 ---
      user: null,
      isAuthenticated: false,
      posts: [
        { 
          id: '1', 
          authorName: 'System', 
          content: 'Welcome to your persistent feed with icons! Try clicking the heart.', 
          createdAt: new Date().toLocaleTimeString(),
          likes: 0
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
      updateProfile: (newName) => set((state) => ({
        user: state.user ? { ...state.user, name: newName } : null
      })),

      // --- 新規投稿追加 ---
      addPost: (content) => set((state) => ({
        posts: [
          {
            id: Date.now().toString(),
            authorName: state.user?.name || 'Anonymous',
            content,
            createdAt: new Date().toLocaleTimeString(),
            likes: 0, // 投稿時は0からスタート
          },
          ...state.posts,
        ]
      })),

      // --- 投稿削除 ---
      deletePost: (id) => set((state) => ({
        posts: state.posts.filter((post) => post.id !== id)
      })),

      // --- いいね機能 ---
      // 指定されたIDの投稿を探し、likesカウントを +1 する
      toggleLike: (id) => set((state) => ({
        posts: state.posts.map((post) => 
          post.id === id ? { ...post, likes: post.likes + 1 } : post
        )
      })),
    }),
    {
      name: 'my-app-storage', // localStorageのキー名
    }
  )
);