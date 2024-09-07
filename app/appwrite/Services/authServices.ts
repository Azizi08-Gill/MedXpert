'use client'

// authServices.ts

import { Client, Account, Databases, ID } from "appwrite";
import { useSignUp } from "@clerk/nextjs"; // Clerk's hook for sign-up
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs"; // Use this to fetch the current user

// Appwrite client initialization
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // Appwrite API endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!); // Appwrite Project ID

const account = new Account(client);
const databases = new Databases(client);

// Define a User object type
interface User {
  id: string; // Clerk user ID
  email: string;
  username?: string;
}

// Function to create a user in Appwrite after Clerk sign-up
const createAppwriteUser = async (user: User) => {
  try {
    // Create a new user in Appwrite
    const newUser = await account.create(
      ID.unique(),
      user.email,
      "temporary_password", // Placeholder password
      user.username || user.email
    );
    
    // Store user data in your Appwrite database
    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      ID.unique(),
      {
        clerkId: user.id, // Store the Clerk ID for reference
        email: user.email,
        username: user.username,
      }
    );

    console.log("User created in Appwrite:", newUser);
  } catch (error) {
    console.error("Error creating user in Appwrite:", error);
    throw error;
  }
};

// Custom Hook to sync Clerk users with Appwrite
const useSyncClerkAndAppwrite = () => {
  const { isLoaded, signUp } = useSignUp();
  const { user } = useUser(); // Use Clerk's useUser hook to get the current user

  useEffect(() => {
    if (isLoaded && signUp && signUp.createdUserId) {
      // Use the user object to get details directly from Clerk
      const clerkUser = {
        id: user?.id || signUp.createdUserId, // Use the Clerk user ID
        email: user?.emailAddresses[0]?.emailAddress || "", // Use Clerk's email
        username: user?.username || "", // Optional username
      };

      // Sync Clerk user with Appwrite when Clerk user signs up
      createAppwriteUser(clerkUser)
        .catch((error) => console.error("Error syncing user with Appwrite:", error));
    }
  }, [isLoaded, signUp, user]); // Ensure user data is available
};

export default useSyncClerkAndAppwrite; // Default export
