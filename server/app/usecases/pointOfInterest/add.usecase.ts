import IInformationService from "../../../domain/pointOfInterest/informationService.interface.ts";
import IPointOfInterestAdapter from "../../../domain/pointOfInterest/poiAdapter.interface.ts";
import IUseCase from "../../../domain/UseCase.ts";

export default class AddPointOfInterestUseCase extends IUseCase {
    /**
     *
     */
    constructor(private adapter: IPointOfInterestAdapter, private informationService: IInformationService) {
        super();
        
    }
    
    execute = () => {
        this.adapter
    }
}