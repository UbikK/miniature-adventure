import PointOfInterest from "./poi.model.ts";

export default interface IPointOfInterestAdapter {
    registerPointOfInterestForUser: (data: any) => Promise<PointOfInterest>
    getPointsOfInterestForUser: (userId: string) => Promise<PointOfInterest[]>
}