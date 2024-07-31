import * as z from "zod";

export const userAuthSchema = z.object({
  email: z.string(),
  password: z.string().min(8),
});

export type UserAuthFormData = z.infer<typeof userAuthSchema>;
