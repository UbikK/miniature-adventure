import Address from "../address/address.model.ts";

export default interface IInformationService {
    getPointOfInterestInformations: (id: string) => Promise<Address>
}
