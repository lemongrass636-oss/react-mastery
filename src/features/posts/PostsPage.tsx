import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';

export const PostsPage = () => {
  const { user, posts, addPost } = useAuthStore();
  const [newPost, setNewPost] = useState('');

  const handlePost = () => {
    if (!newPost.trim()) return;
    addPost(newPost);
    setNewPost(''); // 入力欄を空にする
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* 投稿入力エリア */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex gap-4">
          <Avatar fallback={user?.name[0] || 'U'} className="h-10 w-10" />
          <Input 
            placeholder="What's on your mind?" 
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePost()}
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={handlePost} disabled={!newPost.trim()}>
            Post
          </Button>
        </div>
      </div>

      {/* 投稿一覧エリア */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex gap-4 animate-in fade-in slide-in-from-top-2">
            <Avatar fallback={post.authorName[0]} className="h-10 w-10" />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-gray-900">{post.authorName}</span>
                <span className="text-xs text-gray-400">{post.createdAt}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};