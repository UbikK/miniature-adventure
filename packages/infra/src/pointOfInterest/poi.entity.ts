import { z } from "zod";

export const PointOfInterestSchema = z.object({
    id: z.string().optional(),
    placeId: z.string(),
    coordinates: z.string(),
    addressId: z.string(),
    photoId: z.string().optional(),
    name: z.string(),
    tags: z.array(z.string().optional()).optional()
})

export type PointOfInterestEntity = z.infer<typeof PointOfInterestSchema>