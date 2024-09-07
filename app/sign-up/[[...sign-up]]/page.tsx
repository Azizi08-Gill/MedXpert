"use client"; // Ensure this is a client-side component

import { SignUp } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import useSyncClerkAndAppwrite from "@/app/appwrite/Services/authServices";
import { useRouter } from "next/navigation";
import { GridBackground } from "@/components/ui/GridBackground";
import { useState } from "react";

export default function SignUpPage() {
  const { user } = useUser(); // Always call hooks at the top
  const router = useRouter();
  const [role, setRole] = useState("user"); // Default role is 'user'

  // Call the sync hook at the top level to avoid conditional hooks
  useSyncClerkAndAppwrite();

  // Handle the redirection for signed-in users
  if (user) {
    router.push("/dashboard"); // Redirect to dashboard or desired route
    return null; // Prevent rendering the SignUp component if the user is already signed in
  }

  // Render the SignUp component if the user is not signed in
  return (
    <GridBackground>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="role">Select Your Role:</label>
        <select
          id="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)} // Update the selected role
          style={{ marginLeft: '0.5rem' }}
        >
          <option value="patient">Patient</option>
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
        </select>
      </div>

      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        redirectUrl="/dashboard"
        unsafeMetadata={{
          role: role, // Store the selected role as part of the metadata
        }}
      />
    </GridBackground>
  );
}
