import { IAdapter } from "../adapter.interface.ts";
import PointOfInterest from "./poi.model.ts";

export interface IPointOfInterestAdapter extends IAdapter<PointOfInterest> {
    registerPointOfInterestForUser: (data: PointOfInterest) => Promise<boolean>
    getPointsOfInterestForUser: (userId: string) => Promise<PointOfInterest[]>
    getPredictions: (input: string, coords: string) => Promise<PointOfInterest[]>
}