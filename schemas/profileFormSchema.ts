import { z } from "zod";

// Define the schema using Zod
const profileFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

// Infer the form values' type from the schema
type profileFormSchemaType = z.infer<typeof profileFormSchema>;

export { profileFormSchema };
export type { profileFormSchemaType };
