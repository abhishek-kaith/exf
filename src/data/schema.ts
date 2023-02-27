import { z } from "zod";

export const registerSchema = z
  .object({
    userName: z.string().min(1, "Full name is required").max(100),
    email: z
      .string()
      .min(1, "Email address is required")
      .email("Email Address is invalid"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    passwordConfirm: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Email AgetMeddress is invalid"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const forgetPasswordSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
});

export const forgetPassBodySchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    passwordConfirm: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });

export const genTaskSchema = z.object({
  input: z.string().min(3, "Input Is too short"),
  source: z.string().min(1, "source Is missing"),
  requestType: z.string().min(1, "requrestType is missing"),
});

export const checkOutSchema = z.object({
  proudctPriceId: z.string().min(1, "Product Price Id Is Required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgetPasswordInput = z.infer<typeof forgetPasswordSchema>;
export type ForgetPassInputBody = z.infer<typeof forgetPassBodySchema>;
export type GenTaskInput = z.infer<typeof genTaskSchema>;
export type CheckOutInput = z.infer<typeof checkOutSchema>;
