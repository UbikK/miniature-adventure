import IPointOfInterestAdapter from "../../../domain/pointOfInterest/poiAdapter.interface.ts";
import IUseCase from "../../../domain/UseCase.ts";

export default class AddPointOfInterestUseCase extends IUseCase {
    /**
     *
     */
    constructor(private adapter: IPointOfInterestAdapter) {
        super();
    }
    
    execute = ({userId, placeId, photoId, name}:{userId: string, placeId: string, photoId: string, name: string}) => {
        return this.adapter.registerPointOfInterestForUser({user_id:userId, place_id:placeId, photo_id:photoId, name});
    }
}