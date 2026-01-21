import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // 1. persist をインポート

interface User {
  id: string;
  name: string;
  email: string;
}

interface Post {
  id: string;
  authorName: string;
  content: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  posts: Post[];
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (newName: string) => void;
  addPost: (content: string) => void;
  deletePost: (id: string) => void;
}

// 2. persist で全体を囲みます
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      posts: [
        { 
          id: '1', 
          authorName: 'System', 
          content: 'Welcome to your persistent feed!', 
          createdAt: new Date().toLocaleTimeString() 
        }
      ],

      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      
      updateProfile: (newName) => set((state) => ({
        user: state.user ? { ...state.user, name: newName } : null
      })),

      addPost: (content) => set((state) => ({
        posts: [
          {
            id: Date.now().toString(),
            authorName: state.user?.name || 'Anonymous',
            content,
            createdAt: new Date().toLocaleTimeString(),
          },
          ...state.posts,
        ]
      })),
      // --- 削除アクション ---
      // 指定されたID以外の投稿だけを残す（filterを使う）
      deletePost: (id) => set((state) => ({
        posts: state.posts.filter((post) => post.id !== id)
      })),
    }),
    {
      name: 'my-app-storage', // 3. localStorage に保存される際のキー名（何でもOK）
    }
  )
);