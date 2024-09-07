import { SignIn } from '@clerk/nextjs'
import useSyncClerkAndAppwrite  from '@/app/appwrite/Services/authServices'

export default function SignInPage() {
  useSyncClerkAndAppwrite; // Call the sync function

  return <SignIn />;
}