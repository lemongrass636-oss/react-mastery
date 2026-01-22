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
  authorId: string; // 投稿者を特定するためのID
  authorName: string;
  content: string;
  createdAt: string;
  likedBy: string[]; // 変更：いいねした人のユーザーID（emailなど）を格納する配列
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
  deletePost: (id: string) => void;
  toggleLike: (id: string) => void; // 本格的ないいね切り替えアクション
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
          content: 'Welcome to your new persistent feed! One like per person only.', 
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
            authorId: state.user?.email || 'anon', // 投稿者の特定にemailを使用
            authorName: state.user?.name || 'Anonymous',
            content,
            createdAt: new Date().toLocaleTimeString(),
            likedBy: [], // 最初は誰もいいねしていない
          },
          ...state.posts,
        ]
      })),

      // --- 投稿削除 ---
      deletePost: (id) => set((state) => ({
        posts: state.posts.filter((post) => post.id !== id)
      })),

      // --- 本物のいいねロジック (Toggle) ---
      toggleLike: (id) => set((state) => ({
        posts: state.posts.map((post) => {
          if (post.id !== id) return post;

          // ログイン中のユーザーを特定するID（email）を取得
          const userId = state.user?.email;
          if (!userId) return post; // ログインしていなければ何もしない

          // すでに自分がいいねしているかチェック
          const isLiked = post.likedBy.includes(userId);

          return {
            ...post,
            likedBy: isLiked
              ? post.likedBy.filter((uid) => uid !== userId) // すでにいいねしてたら配列から削除（解除）
              : [...post.likedBy, userId] // していなければ配列に追加
          };
        })
      })),
    }),
    {
      name: 'my-app-storage', // localStorageのキー
    }
  )
);