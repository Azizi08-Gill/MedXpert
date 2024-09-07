import { SignIn } from '@clerk/nextjs'
import useSyncClerkAndAppwrite  from '@/app/appwrite/Services/authServices'
import { GridBackground } from '@/components/ui/GridBackground';

export default function SignInPage() {
  useSyncClerkAndAppwrite; // Call the sync function

  return (
    <div className='z-50'>
      <GridBackground>
        <SignIn />
      </GridBackground>
    </div>
  );
}