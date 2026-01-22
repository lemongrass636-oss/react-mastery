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
  authorId: string; // 削除権限の判定に重要
  authorName: string;
  content: string;
  createdAt: string;
  likedBy: string[];
}

// ストア全体の型定義
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  posts: Post[];
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (newName: string) => void;
  addPost: (content: string) => void;
  deletePost: (id: string) => void;
  toggleLike: (id: string) => void;
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
          authorId: 'system-admin',
          authorName: 'System', 
          content: 'Security update: Only your own posts can be deleted now.', 
          createdAt: new Date().toLocaleTimeString(),
          likedBy: [] 
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
      addPost: (content) => set((state) => {
        // 重要：投稿時に「誰が書いたか」を確実に保存する
        // ログインしていない場合は 'guest' とするが、基本はガードされているはず
        const currentUserEmail = state.user?.email || 'guest';
        const currentUserName = state.user?.name || 'Anonymous';

        return {
          posts: [
            {
              id: Date.now().toString(),
              authorId: currentUserEmail, // ここを確実に user.email と一致させる
              authorName: currentUserName,
              content,
              createdAt: new Date().toLocaleTimeString(),
              likedBy: [], 
            },
            ...state.posts,
          ]
        };
      }),

      // --- 投稿削除 ---
      deletePost: (id) => set((state) => ({
        posts: state.posts.filter((post) => post.id !== id)
      })),

      // --- いいね機能 (Toggle) ---
      toggleLike: (id) => set((state) => ({
        posts: state.posts.map((post) => {
          if (post.id !== id) return post;

          const userId = state.user?.email;
          if (!userId) return post;

          const currentLikes = Array.isArray(post.likedBy) ? post.likedBy : [];
          const isLiked = currentLikes.includes(userId);

          return {
            ...post,
            likedBy: isLiked
              ? currentLikes.filter((uid) => uid !== userId)
              : [...currentLikes, userId]
          };
        })
      })),
    }),
    {
      name: 'my-app-storage',
      version: 1,
      // データ構造の不整合を防ぐためのマイグレーション設定（空でも定義しておくのが安全）
      migrate: (persistedState: any, version) => {
        return persistedState as AuthState;
      },
    }
  )
);