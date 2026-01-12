import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router';
import { LoginPage } from './features/auth/LoginPage';
import { PostsPage } from './features/posts/PostsPage';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/">Login</Link> | <Link to="/posts">Posts</Link>
        {isAuthenticated && (
          <button onClick={logout} style={{ marginLeft: '1rem' }}>Logout</button>
        )}
      </nav>

      <div style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          
          {/* 認証ガード: ログインしてなければログイン画面へリダイレクト */}
          <Route 
            path="/posts" 
            element={isAuthenticated ? <PostsPage /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;