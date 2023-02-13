import { Address, IPointOfInterestAdapter, IUseCase, PointOfInterest, User } from "@domain";
import { PointOfInterestDto } from "@infra/pointOfInterest/poi.dto.ts";
export default class AddPointOfInterestUseCase implements IUseCase {
    /**
     *
     */
    constructor(private adapter: IPointOfInterestAdapter) {}
    
    execute = (data: PointOfInterestDto) => {
        const poi = new PointOfInterest({
            ...data, 
            address: data.address ? new Address(data.address) :  undefined,
            user: data.user? new User(data.user) : undefined
        });

        return this.adapter.registerPointOfInterestForUser(poi);
    }
}