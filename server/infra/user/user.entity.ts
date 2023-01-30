import { z } from "zod";

export const UserSchema = z.object({
    id: z.string().optional(),
    lastName: z.string().optional(),
    firstName: z.string().optional(),
    email: z.string(),
    password: z.string().nullable()
})

export type UserEntity = z.infer<typeof UserSchema>