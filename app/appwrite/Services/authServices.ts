"use client";

import { Client, Account, Databases, Storage, ID } from "appwrite";
import { useSignUp } from "@clerk/nextjs"; // Clerk's hook for sign-up
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs"; // Use this to fetch the current user

// Appwrite client initialization
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!) // Appwrite API endpoint from .env
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!); // Appwrite Project ID from .env

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Define a User object type
interface User {
  id: string; // Clerk user ID
  email: string;
  username?: string;
}

// Function to upload a file to the Appwrite storage bucket
const uploadImage = async (file: File): Promise<string> => {
  try {
    const uploadedFile = await storage.createFile(
      process.env.NEXT_PUBLIC_IMAGE_BUCKET_ID!, // Bucket ID for images
      ID.unique(), // Generate a unique ID for the file
      file // The file to be uploaded (passed from an input element)
    );
    return uploadedFile.$id; // Return the file ID for storing in the user document
  } catch (error) {
    console.error("Error uploading file to Appwrite:", error);
    throw error;
  }
};

// Function to create a user in Appwrite after Clerk sign-up
const createAppwriteUser = async (user: User, profileImageId?: string) => {
  try {
    // Create a new user in Appwrite (optional if not using Appwrite user system)
    const newUser = await account.create(
      ID.unique(),
      user.email,
      "temporary_password", // Placeholder password
      user.username || user.email
    );

    // Store user data in the Appwrite collection (users)
    await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!, // Database ID from .env
      process.env.NEXT_PUBLIC_COLLECTION_ID!, // Collection ID for users from .env
      ID.unique(), // Generate a unique document ID
      {
        clerkId: user.id, // Store the Clerk ID for reference
        email: user.email, // User email
        username: user.username, // User username
        profileImageId: profileImageId || "" // Store image ID if provided, or an empty string
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
  const { user } = useUser(); // Clerk's useUser hook to get the current user

  useEffect(() => {
    if (isLoaded && signUp && signUp.createdUserId) {
      // Use the Clerk user object to get details
      const clerkUser = {
        id: user?.id || signUp.createdUserId, // Clerk user ID
        email: user?.emailAddresses[0]?.emailAddress || "", // Clerk user email
        username: user?.username || "" // Optional username
      };

      // Handle optional image upload and user creation
      const handleUserCreation = async () => {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement; // Assuming an input element with the id 'fileInput'
        let profileImageId = "";

        // Check if an image is provided for upload
        if (fileInput?.files && fileInput.files.length > 0) {
          profileImageId = await uploadImage(fileInput.files[0]); // Upload the image and get the ID
        }

        // Create the user in Appwrite with or without the image
        await createAppwriteUser(clerkUser, profileImageId);
      };

      handleUserCreation().catch((error) => console.error("Error syncing user with Appwrite:", error));
    }
  }, [isLoaded, signUp, user]);
};

export default useSyncClerkAndAppwrite;
