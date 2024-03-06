import { z } from "zod"
 
const erpSchema = z.object({
  erpId: z.string().min(11).max(11),
})

const passwordSchema = z.object({
  password: z.string()
  .min(8, { message: "Password must be 11 characters long" })
  .refine((value) => value.toLowerCase() !== value, { message: "Password must include at least one uppercase letter" })
  .refine((value) => value.toUpperCase() !== value, { message: "Password must include at least one lowercase letter" })
  .refine((value) => /[0-9]/.test(value), { message: "Password must contain at least one number" }) // Minimal regex use for numeric check
  .refine((value) => Array.from(value).some(char => !char.match(/[a-zA-Z0-9]/)), { message: "Password must include at least one special character" }),
  confirmPassword: z.string()
}).refine((data) => 
  data.password === data.confirmPassword, { message: "Passwords don't match", path: ["confirmPassword"] })

const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 characters long" })
})

export {
  erpSchema,
  passwordSchema,
  otpSchema
}
