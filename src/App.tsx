import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router';
import { useAuthStore } from './store/useAuthStore';

// 各機能のコンポーネントをインポート
import { LoginPage } from './features/auth/LoginPage';
import { PostsPage } from './features/posts/PostsPage';
import { ContactPage } from './features/contact/ContactPage';

function App() {
  // Zustandから認証状態とログアウト関数を取得
  const { isAuthenticated, logout, user } = useAuthStore();

  return (
    <BrowserRouter>
      {/* ナビゲーションバー */}
      <nav style={{ 
        padding: '1rem', 
        borderBottom: '1px solid #ddd', 
        display: 'flex', 
        gap: '1rem', 
        alignItems: 'center',
        backgroundColor: '#f9f9f9' 
      }}>
        <Link to="/" style={{ fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>
          My App
        </Link>
        
        <Link to="/posts">Posts (Query)</Link>
        <Link to="/contact">Contact (Form)</Link>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {isAuthenticated ? (
            <>
              <span>Hi, <strong>{user?.name}</strong></span>
              <button onClick={logout} style={{ cursor: 'pointer' }}>Logout</button>
            </>
          ) : (
            <Link to="/">Login</Link>
          )}
        </div>
      </nav>

      {/* メインコンテンツエリア */}
      <main style={{ padding: '2rem' }}>
        <Routes>
          {/* ログインページ */}
          <Route path="/" element={<LoginPage />} />

          {/* お問い合わせページ (誰でもアクセス可能) */}
          <Route path="/contact" element={<ContactPage />} />
          
          {/* 投稿一覧ページ (認証ガード: ログインしていない場合はログイン画面へリダイレクト) */}
          <Route 
            path="/posts" 
            element={
              isAuthenticated ? (
                <PostsPage />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />

          {/* 存在しないURLにアクセスした場合はトップへ飛ばす */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;