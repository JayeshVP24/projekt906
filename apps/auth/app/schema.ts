import { z } from "zod"
 
const formSchema = z.object({
  erpId: z.string().min(11).max(11),
  password: z.string()
  .min(8, { message: "Password must be minimmum 8 characters long" })
  .refine((value) => value.toLowerCase() !== value, { message: "Password must include at least one uppercase letter" })
  .refine((value) => value.toUpperCase() !== value, { message: "Password must include at least one lowercase letter" })
  .refine((value) => /[0-9]/.test(value), { message: "Password must contain at least one number" }) // Minimal regex use for numeric check
  .refine((value) => Array.from(value).some(char => !char.match(/[a-zA-Z0-9]/)), { message: "Password must include at least one special character" })

})

export default formSchema
