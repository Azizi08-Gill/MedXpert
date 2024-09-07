import { account } from "../config";
import { OAuthProvider } from "appwrite"; // Import the OAuthProvider from Appwrite
import { ID } from "appwrite";
// Define a User object type for return type (adjust as per actual API structure if needed)
interface User {
  $id: string;
  [key: string]: any; // Use this to allow other dynamic properties
}

interface Session {
  $id: string;
  [key: string]: any; // Use this to allow other dynamic properties
}

// Register user with email and password
export async function registerUser(username: string, email: string, password: string): Promise<User> {
  const user = await account.create(ID.unique(), email, password, username);
  localStorage.setItem("authToken", user.$id);
  console.log(user);
  return user;
}

// Sign in with email and password
export const signIn = async (email: string, password: string): Promise<Session> => {
  try {
    const session = await account.createSession(email, password); // Use createSession for email-password login
    localStorage.setItem("authToken", session.$id); // Store the session ID
    return session;
  } catch (error: any) {
    console.error("Login error:", error); // Log the error details
    throw error;
  }
};

// Google OAuth Sign-in
export const signInWithGoogle = async (): Promise<void> => {
  try {
    // Use the correct OAuthProvider type for Google OAuth
    await account.createOAuth2Session(OAuthProvider.Google, `${window.location.origin}/dashboard`, `${window.location.origin}/auth/sign-in`);
  } catch (error: any) {
    console.error("Google Sign-in error:", error); // Log the error details
    throw error;
  }
};

// Sign out the current user
export const signOutUser = async (): Promise<void> => {
  try {
    await account.deleteSession('current');
    localStorage.removeItem("authToken");
  } catch (error: any) {
    throw error;
  }
};

// Get the current user
export const getCurrentUser = async (): Promise<User> => {
  try {
    const user = await account.get();
    return user;
  } catch (error: any) {
    throw error;
  }
};

// Check if the user is authenticated
export const checkAuth = async (): Promise<boolean> => {
  try {
    await account.get(); // If this doesn't throw an error, the user is authenticated
    return true;
  } catch (error: any) {
    return false;
  }
};

// Send password recovery email
export const sendPasswordRecoveryEmail = async (email: string): Promise<void> => {
  const resetPasswordUrl = `${window.location.origin}/reset-password`; // Automatically construct URL
  try {
    await account.createRecovery(email, resetPasswordUrl);
  } catch (error: any) {
    throw error;
  }
};
