import { z } from "zod";

export const createUserZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name too short, minimum 2 characters long" })
    .max(50, { message: "Name too long" }),

  email: z
    .string()
    .email({ message: "Invalid email format" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),

  phone: z
    .string()
    .regex(/^[0-9]{11}$/, { message: "Phone must be exactly 11 digits" }),

  address: z
    .string()
    .max(100, { message: "Address too long" })
    .optional(),
});
