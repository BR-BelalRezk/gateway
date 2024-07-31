import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().nullable(),
  email: z.string(),
  role: z.object({
    value: z.string(),
    label: z.string(),
  }),
  isActivated: z.boolean(),
  branch: z.object({
    value: z.number(),
    label: z.string(),
  }),
});


export const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type UserRow = z.infer<typeof userSchema>;
