"use client"; // Ensure this is a client-side component

import { SignUp } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import useSyncClerkAndAppwrite from "@/app/appwrite/Services/authServices";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { user } = useUser(); // Always call hooks at the top
  const router = useRouter();

  // Call the sync hook at the top level to avoid conditional hooks
  useSyncClerkAndAppwrite();

  // Handle the redirection for signed-in users
  if (user) {
    router.push("/dashboard"); // Redirect to dashboard or desired route
    return null; // Prevent rendering the SignUp component if the user is already signed in
  }

  // Render the SignUp component if the user is not signed in
  return <SignUp />;
}
