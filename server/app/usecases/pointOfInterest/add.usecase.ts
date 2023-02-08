import { IPointOfInterestAdapter, IUseCase } from "domain";
export default class AddPointOfInterestUseCase implements IUseCase {
    /**
     *
     */
    constructor(private adapter: IPointOfInterestAdapter) {}
    
    execute = ({userId, placeId, photoId, name}:{userId: string, placeId: string, photoId: string, name: string}) => {
        return this.adapter.registerPointOfInterestForUser({user_id:userId, place_id:placeId, photo_id:photoId, name});
    }
}