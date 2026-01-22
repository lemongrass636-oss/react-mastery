import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Heart, Trash2, Send } from 'lucide-react';

export const PostsPage = () => {
  const { user, posts, addPost, deletePost, toggleLike } = useAuthStore();
  const [newPost, setNewPost] = useState('');

  const handlePost = () => {
    if (!newPost.trim()) return;
    addPost(newPost);
    setNewPost('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      
      {/* --- 投稿入力エリア --- */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center">
        <Avatar fallback={user?.name?.[0] || 'U'} className="h-10 w-10 shrink-0" />
        <div className="flex-1 flex gap-2">
          <Input 
            placeholder="今、何してる？" 
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                handlePost();
              }
            }}
            className="border-none bg-gray-50 focus-visible:ring-0 text-base"
          />
          <Button 
            onClick={handlePost} 
            disabled={!newPost.trim()} 
            size="icon" 
            className="rounded-full shrink-0 h-10 w-10"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* --- 投稿一覧エリア --- */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-400 italic">
            まだ投稿がありません。
          </div>
        ) : (
          posts.map((post) => {
            // 【安全策】もし post.likedBy が配列でない場合に備えて空配列をデフォルトにする
            const likedUsers = Array.isArray(post.likedBy) ? post.likedBy : [];
            const isLikedByMe = likedUsers.includes(user?.email || "");

            return (
              <div 
                key={post.id} 
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm group transition-all hover:shadow-md"
              >
                <div className="flex gap-4">
                  <Avatar fallback={post.authorName?.[0] || '?'} className="h-10 w-10 shrink-0" />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 truncate">{post.authorName}</span>
                        <span className="text-[10px] text-gray-400">{post.createdAt}</span>
                      </div>

                      {/* 削除ボタン */}
                      {user?.email === post.authorId && (
                        <button
                          onClick={() => {
                            if (window.confirm('この投稿を削除しますか？')) {
                              deletePost(post.id);
                            }
                          }}
                          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    
                    <p className="mt-2 text-gray-800 leading-relaxed break-words">
                      {post.content}
                    </p>

                    {/* --- いいねボタン --- */}
                    <div className="mt-4 flex items-center gap-6">
                      <button 
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-1.5 transition-colors group/like ${
                          isLikedByMe ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'
                        }`}
                      >
                        <Heart 
                          className={`h-4 w-4 transition-all active:scale-150 ${
                            isLikedByMe 
                              ? 'fill-pink-500 text-pink-500' 
                              : 'group-hover/like:scale-110'
                          }`} 
                        />
                        <span className={`text-xs font-bold ${isLikedByMe ? 'text-pink-500' : ''}`}>
                          {likedUsers.length}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};