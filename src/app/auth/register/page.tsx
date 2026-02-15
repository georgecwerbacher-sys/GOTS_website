import { Suspense } from 'react';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata = {
  title: 'Create Account - Guardians of the Spear',
  description: 'Join GOTS and begin your story',
};

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
        <p className="text-gray-600 mt-2">
          Join millions in an immersive historical fiction experience
        </p>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
