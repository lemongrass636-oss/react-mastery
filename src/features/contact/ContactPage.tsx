import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// 1. 作成した Input と Button をインポート
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const contactSchema = z.object({
  username: z.string().min(2, '名前は2文字以上で入力してください'),
  email: z.string().email('正しいメールアドレスを入力してください'),
  message: z.string().min(10, 'メッセージは10文字以上入力してください'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
    alert('送信されました！');
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          {/* 2. <input> を <Input /> に変更 */}
          <Input {...register('username')} placeholder="司波　達也" />
          {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input {...register('email')} type="email" placeholder="example@mail.com" />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Message</label>
          {/* テキストエリアもInputと同じスタイルを当てるか、別途Textareaを作るのもアリです */}
          <textarea 
            {...register('message')} 
            className="flex min-h-[100px] w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
            placeholder="お問い合わせ内容を入力してください"
          />
          {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
        </div>

        <Button type="submit" className="w-full">Send Message</Button>
      </form>
    </div>
  );
};