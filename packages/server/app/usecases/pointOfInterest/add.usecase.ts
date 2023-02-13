import { IPointOfInterestAdapter, IUseCase, PointOfInterestDto } from "domain";
export default class AddPointOfInterestUseCase implements IUseCase {
    /**
     *
     */
    constructor(private adapter: IPointOfInterestAdapter) {}
    
    execute = (data: PointOfInterestDto) => {
        return this.adapter.registerPointOfInterestForUser(data);
    }
}