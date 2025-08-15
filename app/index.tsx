import { Redirect } from 'expo-router';
import { useAuthStore } from '@store/authStore';

export default function Index() {
  const isLoggedIn = !!useAuthStore((s) => s.currentUser?.token);
  return <Redirect href={isLoggedIn ? '/(private)/home' : '/(public)/login'} />;
}
