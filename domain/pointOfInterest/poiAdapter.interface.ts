import PointOfInterest from "./poi.model.ts";

export type IPointOfInterestAdapter = {
    registerPointOfInterestForUser: (data: any) => Promise<PointOfInterest>
    getPointsOfInterestForUser: (userId: string) => Promise<PointOfInterest[]>
}