import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// 1. バリデーションルールを定義 (Zod)
const contactSchema = z.object({
  username: z.string().min(2, '名前は2文字以上で入力してください'),
  email: z.string().email('正しいメールアドレスを入力してください'),
  message: z.string().min(10, 'メッセージは10文字以上入力してください'),
});

// 2. 型を抽出
type ContactFormData = z.infer<typeof contactSchema>;

export const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema), // Zodを適用
  });

  const onSubmit = (data: ContactFormData) => {
    console.log('送信データ:', data);
    alert('送信されました！');
  };

  return (
    <div style={{ maxWidth: '400px' }}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label><br />
          <input {...register('username')} />
          <p style={{ color: 'red' }}>{errors.username?.message}</p>
        </div>

        <div>
          <label>Email:</label><br />
          <input {...register('email')} />
          <p style={{ color: 'red' }}>{errors.email?.message}</p>
        </div>

        <div>
          <label>Message:</label><br />
          <textarea {...register('message')} />
          <p style={{ color: 'red' }}>{errors.message?.message}</p>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};