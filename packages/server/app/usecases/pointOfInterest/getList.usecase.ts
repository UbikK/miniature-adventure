import { IPointOfInterestAdapter, IUseCase } from "@domain";
import { PointOfInterestDto } from "@infra/pointOfInterest/poi.dto.ts";


export default class GetListPointOfInterestUseCase implements IUseCase {
    constructor(private adapter: IPointOfInterestAdapter) {
    }

    execute: (userId: string) => Promise<PointOfInterestDto[]> = async (userId) => {
        const list = await this.adapter.getPointsOfInterestForUser(userId);

        return list.map(poi => this.adapter.toDto(poi))
    };
}