import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router';
// 1. 作成した Button コンポーネントをインポート
import { Button } from '@/components/ui/button'; 

export const LoginPage = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ id: '1', name: 'Gemini User', email: 'test@example.com' });
    navigate('/posts');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
      <p className="text-muted-foreground text-gray-500">Please sign in to your account</p>
      
      {/* 2. ここを shadcn の Button に入れ替え！ */}
      <Button 
        onClick={handleLogin} 
        variant="default" // 青色の背景（さっき定義したスタイル）
        size="lg"        // 大きめサイズ
        className="w-full max-w-xs transition-all active:scale-95"
      >
        Login with shadcn
      </Button>
    </div>
  );
};