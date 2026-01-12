import { useAuthStore } from './store/useAuthStore';

function App() {
  const { user, isAuthenticated, login, logout } = useAuthStore();

  const handleLogin = () => {
    // 本来はAPIを叩きますが、まずはモックデータでテスト
    login({ id: '1', name: 'Gemini User', email: 'test@example.com' });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Auth Test with Zustand</h1>
      
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please log in.</p>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;