import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';

export const PostsPage = () => {
  // ストアから必要な状態とアクションを取得
  const { user, posts, addPost, deletePost } = useAuthStore();
  const [newPost, setNewPost] = useState('');

  // 投稿処理
  const handlePost = () => {
    if (!newPost.trim()) return;
    addPost(newPost);
    setNewPost(''); // 入力欄をクリア
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      {/* --- 投稿入力エリア --- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex gap-4">
          <Avatar fallback={user?.name?.[0] || 'U'} className="h-10 w-10 shrink-0" />
          <div className="flex-1 space-y-4">
            <Input 
              placeholder="What's on your mind?" 
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              // Enterキーでも投稿できるように
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                  handlePost();
                }
              }}
              className="border-none bg-gray-50 focus-visible:ring-1 focus-visible:ring-blue-500 text-lg"
            />
            <div className="flex justify-end">
              <Button 
                onClick={handlePost} 
                disabled={!newPost.trim()}
                className="rounded-full px-6 font-bold"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* --- 投稿一覧エリア --- */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No posts yet. Be the first to say something!
          </div>
        ) : (
          posts.map((post) => (
            <div 
              key={post.id} 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex gap-4 group transition-all hover:border-gray-200"
            >
              {/* 投稿者のアバター */}
              <Avatar fallback={post.authorName[0]} className="h-10 w-10 shrink-0" />
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="font-bold text-gray-900 truncate">{post.authorName}</span>
                    <span className="text-xs text-gray-400 shrink-0">{post.createdAt}</span>
                  </div>

                  {/* 【削除ロジック】自分の名前と投稿者名が一致する場合のみ表示 */}
                  {user?.name === post.authorName && (
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this post?')) {
                          deletePost(post.id);
                        }
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium text-gray-400 hover:text-red-500 px-2 py-1 rounded-md hover:bg-red-50"
                    >
                      Delete
                    </button>
                  )}
                </div>
                
                {/* 投稿本文 */}
                <p className="text-gray-700 leading-relaxed break-words">
                  {post.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};