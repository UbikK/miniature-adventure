import PointOfInterest from "../../../domain/pointOfInterest/poi.model.ts";
import IPointOfInterestAdapter from "../../../domain/pointOfInterest/poiAdapter.interface.ts";
import IUseCase from "../../../domain/UseCase.ts";

export default class GetListPointOfInterestUseCase extends IUseCase {
    constructor(private adapter: IPointOfInterestAdapter) {
        super();
    }

    execute: (userId: string) => Promise<PointOfInterest[]> = (userId) => {
        return this.adapter.getPointsOfInterestForUser(userId);
    };
}