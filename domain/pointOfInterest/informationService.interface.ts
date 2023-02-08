import Address from "../address/address.model.ts";

export type IInformationService = {
    getPointOfInterestInformations: (id: string) => Promise<Address>
}
