import { IPointOfInterestAdapter, IUseCase } from '@domain';

export default class GetPredictionsUseCase implements IUseCase {
    constructor(private adapter: IPointOfInterestAdapter) {}
    execute = async ({input, coords}: {input: string, coords: string}) => {
        const list = await this.adapter.getPredictions(input, coords);

        return list.map(poi => this.adapter.toDto(poi));
    };
}