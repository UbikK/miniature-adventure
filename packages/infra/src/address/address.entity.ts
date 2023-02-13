import { z } from "zod";

export const AddressSchema = z.object({
  id: z.string().optional(),
  street: z.string(),
  zipcode: z.string(),
  city: z.string(),
  country: z.string(),
});

export type AddressEntity = z.infer<typeof AddressSchema>;
