import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Mail, User } from 'lucide-react';

export const LoginPage = () => {
  const login = useAuthStore((state) => state.login);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      login({
        id: Date.now().toString(), // 簡易的なID
        name: name,
        email: email,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-blue-500">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <p className="text-gray-500 text-sm">名前とメールアドレスを入力してください</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">ユーザー名</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="山田 太郎"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">メールアドレス</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full font-bold h-11 bg-blue-600 hover:bg-blue-700"
              disabled={!name.trim() || !email.trim()}
            >
              ログイン
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center justify-center">
          <p className="text-[10px] text-gray-400">
            ※入力した情報はブラウザのLocal Storageに保存されます
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};