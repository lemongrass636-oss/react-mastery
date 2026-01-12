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
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Name</label><br />
          <input {...register('username')} />
          {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Email</label><br />
          <input {...register('email')} />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Message</label><br />
          <textarea {...register('message')} />
          {errors.message && <p style={{ color: 'red' }}>{errors.message.message}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};