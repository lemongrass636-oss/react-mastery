import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/posts';

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'], // キャッシュの識別子
    queryFn: fetchPosts, // 実行する関数
    staleTime: 1000 * 60, // 2026年風に：1分間はデータを「新鮮」とみなす
  });
};