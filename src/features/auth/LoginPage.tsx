import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router';

export const LoginPage = () => {
  const { login, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ id: '1', name: 'Gemini User', email: 'test@example.com' });
    navigate('/posts'); // ログインしたら投稿一覧へ飛ばす
  };

  return (
    <div>
      <h2>Login Page</h2>
      {isAuthenticated ? <p>Already logged in</p> : <button onClick={handleLogin}>Login</button>}
    </div>
  );
};