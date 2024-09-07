import { NextApiRequest, NextApiResponse } from "next";
import { Clerk } from "@clerk/clerk-sdk-node";

// Initialize Clerk SDK with the API key
const clerkClient = Clerk({ apiKey: process.env.CLERK_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  try {
    const user = await clerkClient.users.getUser(userId as string);
    res.status(200).json(user);
  } catch (error) {
    console.error("Failed to fetch Clerk user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
}
