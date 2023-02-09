import { IPointOfInterestAdapter, IUseCase } from 'domain';

export default class GetPredictionsUseCase implements IUseCase {
    constructor(private adapter: IPointOfInterestAdapter) {}
    execute = ({input, coords}: {input: string, coords: string}) => {
        return this.adapter.getPredictions(input, coords);
    };
}