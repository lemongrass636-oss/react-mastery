import { useState } from 'react'; // 追加
import { useAuthStore } from '../../store/useAuthStore';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const ProfilePage = () => {
  // 1. updateProfile アクションを取得
  const { user, updateProfile } = useAuthStore();
  const [name, setName] = useState(user?.name || "");

  if (!user) return <div className="p-8 text-center">Please login first.</div>;

  const handleUpdate = () => {
    updateProfile(name);
    alert('Profile updated successfully!');
  };

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-8">
      <div className="flex items-center space-x-6">
        <Avatar fallback={user.name[0]} />
        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="grid gap-6 p-6 border rounded-xl bg-card shadow-sm bg-white">
        <h2 className="text-xl font-semibold">Profile Settings</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Display Name</label>
            {/* 2. onChange で入力を state に反映 */}
            <Input 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <Button onClick={handleUpdate} className="w-full sm:w-auto">
            Update Profile
          </Button>
        </div>
      </div>
    </div>
  );
};