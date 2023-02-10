import { z } from "zod";

export const PointOfInterestSchema = z.object({
    id: z.string().optional(),
    place_id: z.string(),
    coordinates: z.string(),
    address_id: z.string(),
    photo_id: z.string(),
    name: z.string(),
    user_id: z.string(),
    tags: z.array(z.string()).optional()
})

export type PointOfInterestEntity = z.infer<typeof PointOfInterestSchema>