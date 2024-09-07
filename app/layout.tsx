import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Devathon Project",
  description: "Team Project for Devathon 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Navigation based on authentication status */}
            <SignedIn>
              <UserButton /> {/* Show user profile button when signed in */}
            </SignedIn>
            <SignedOut>
              <SignInButton /> {/* Show sign-in button when signed out */}
            </SignedOut>

            {/* Render children */}
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
