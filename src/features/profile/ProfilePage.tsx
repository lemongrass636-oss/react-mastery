import { useAuthStore } from '../../store/useAuthStore';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const ProfilePage = () => {
  const { user } = useAuthStore();

  if (!user) return <div className="p-8 text-center">Please login first.</div>;

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-8">
      <div className="flex items-center space-x-6">
        {/* fallbackには名前の最初の文字を表示 */}
        <Avatar fallback={user.name[0]} />
        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="grid gap-6 p-6 border rounded-xl bg-card shadow-sm">
        <h2 className="text-xl font-semibold">Profile Settings</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Display Name</label>
            <Input defaultValue={user.name} />
          </div>
          <Button>Update Profile</Button>
        </div>
      </div>
    </div>
  );
};