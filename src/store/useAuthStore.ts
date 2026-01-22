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
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
  likedBy: string[]; // 以前の "likes: number" から変更
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
          content: 'Welcome! Your data is now safely migrated.', 
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
      addPost: (content) => set((state) => ({
        posts: [
          {
            id: Date.now().toString(),
            authorId: state.user?.email || 'anon',
            authorName: state.user?.name || 'Anonymous',
            content,
            createdAt: new Date().toLocaleTimeString(),
            likedBy: [], 
          },
          ...state.posts,
        ]
      })),

      // --- 投稿削除 ---
      deletePost: (id) => set((state) => ({
        posts: state.posts.filter((post) => post.id !== id)
      })),

      // --- 本物のいいねロジック ---
      toggleLike: (id) => set((state) => ({
        posts: state.posts.map((post) => {
          if (post.id !== id) return post;

          const userId = state.user?.email;
          if (!userId) return post;

          // 万が一 likedBy が配列でない（古いキャッシュが残っている）場合への安全策
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
      // バージョン管理を追加することで、構造変更によるクラッシュを防ぎやすくします
      version: 1, 
    }
  )
);