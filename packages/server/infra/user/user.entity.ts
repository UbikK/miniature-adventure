import { z } from "zod";

export const UserSchema = z.object({
    id: z.string().optional(),
    lastname: z.string().optional(),
    firstname: z.string().optional(),
    email: z.string(),
    password: z.string().nullable().optional(),
    googleinfos: z.object({
        idToken:z.string(), 
        scopes: z.array(z.string()), 
        serverAuthCode: z.string().nullable(),
        user: z.object({
            email: z.string(),
            familyName: z.string(),
            givenName: z.string(),
            id: z.string(),
            name: z.string(),
            photo: z.string()
        })
    }).optional()
})



export type UserEntity = z.infer<typeof UserSchema>