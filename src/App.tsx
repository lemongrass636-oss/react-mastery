import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router';
import { useAuthStore } from './store/useAuthStore';
import { LoginPage } from './features/auth/LoginPage';
import { PostsPage } from './features/posts/PostsPage';
import { ContactPage } from './features/contact/ContactPage';
import { Button } from "@/components/ui/button";

function App() {
  const { isAuthenticated, logout, user } = useAuthStore();

  return (
    <BrowserRouter>
      {/* ナビゲーションバー：背景白、影あり、上部に固定、ぼかし効果 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* 左側：ロゴとメニュー */}
            <div className="flex items-center gap-8">
              <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                My App
              </Link>
              <div className="hidden md:flex gap-6">
                <Link to="/posts" className="text-gray-600 hover:text-blue-600 font-medium transition">Posts</Link>
                <Link to="/contact" className="text-gray-600 hover:text-blue-600 font-medium transition">Contact</Link>
              </div>
            </div>

            {/* 右側：ユーザー情報とボタン */}
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline text-sm text-gray-500">
                    Welcome, <span className="font-semibold text-gray-900">{user?.name}</span>
                  </span>
                  <button 
                    onClick={logout}
                    className="bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-all border border-transparent hover:border-red-100"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  to="/" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md shadow-blue-200 transition"
                >
                  Login
                </Link>
              )}
            </div>

          </div>
        </div>
      </nav>

      {/* メインコンテンツ：背景を少しグレーにして浮かび上がらせる */}
      <main className="min-h-screen bg-gray-50 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route 
              path="/posts" 
              element={isAuthenticated ? <PostsPage /> : <Navigate to="/" replace />} 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;