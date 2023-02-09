import { IPointOfInterestAdapter, IUseCase, PointOfInterest } from "domain";


export default class GetListPointOfInterestUseCase implements IUseCase {
    constructor(private adapter: IPointOfInterestAdapter) {
    }

    execute: (userId: string) => Promise<PointOfInterest[]> = (userId) => {
        return this.adapter.getPointsOfInterestForUser(userId);
    };
}