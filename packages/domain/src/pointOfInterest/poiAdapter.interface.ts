import { PointOfInterestDto } from "./poi.model.ts";

export type IPointOfInterestAdapter = {
    registerPointOfInterestForUser: (data: any) => Promise<PointOfInterestDto>
    getPointsOfInterestForUser: (userId: string) => Promise<PointOfInterestDto[]>
    getPredictions: (input: string, coords: string) => Promise<PointOfInterestDto[]>
}