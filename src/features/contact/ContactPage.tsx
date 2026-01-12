import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// 1. バリデーションの「ルール」を定義
const contactSchema = z.object({
  username: z.string().min(2, '名前は2文字以上で入力してください'),
  email: z.string().email('正しいメールアドレス形式で入力してください'),
  message: z.string().min(10, 'メッセージは10文字以上入力してください'),
});

// 2. ルールから「型」を自動生成（TypeScriptの恩恵）
type ContactFormData = z.infer<typeof contactSchema>;

export const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema), // Zodを紐付け
  });

  const onSubmit = (data: ContactFormData) => {
    console.log('送信成功！:', data);
    alert('お問い合わせを送信しました');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input 
            {...register('username')} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            {...register('email')} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out shadow-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};