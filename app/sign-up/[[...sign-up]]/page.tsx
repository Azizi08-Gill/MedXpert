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
      {/* Background gradient from purple to black to white */}
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, purple, black, white)",
          zIndex: 1,
        }}
      >
        <div style={{ marginBottom: '5rem', zIndex: 1, marginLeft: -400 }}>
          <label style={{ fontWeight: "bolder" }} htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: '15%',
              margin: '20px',
              fontSize: '1rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              outline: 'none',
              backgroundColor: '#fff',
              color: '#333',
              cursor: 'pointer',
              transition: 'border-color 0.2s ease-in-out',
            }}
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
      </div>
    </GridBackground>
  );
}
