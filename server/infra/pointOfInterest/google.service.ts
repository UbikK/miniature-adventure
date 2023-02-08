import { Address, IInformationService } from 'domain';
import { AddressComponent, AddressType, PlaceDetailsResponse } from 'maps';

export default class GoogleService implements IInformationService {
    private readonly SERVICE_API_URL = 'https://maps.googleapis.com/maps/api/place/details/json';

    constructor() {}

    getPointOfInterestInformations = async (id: string): Promise<Address> => {

        const url = `${this.SERVICE_API_URL}?place_id=${id}&fields=address_components,geometry/location,name,photo&language=fr&key=${Deno.env.get('GOOGLE_MAPS_API_KEY')}`

        const response = await fetch(url);

        const detailsResponse: PlaceDetailsResponse  = await response.json();

    
        if (detailsResponse.status !== 0) {
            throw new Error(detailsResponse.statusText);
        }

        const addressComponents = detailsResponse.data.result.address_components;

        return new Address({
            street: `${addressComponents!.find((a: AddressComponent) => a.types.includes(AddressType.street_number))?.long_name} ${addressComponents!.find((a: AddressComponent) => a.types.includes(AddressType.route))?.long_name}`,
            zipcode: addressComponents!.find((a: AddressComponent) => a.types.includes(AddressType.postal_code))!.long_name,
            city: addressComponents!.find((a: AddressComponent) => a.types.includes(AddressType.locality))!.long_name ?? addressComponents!.find((a: AddressComponent) => a.types.includes(AddressType.administrative_area_level_2))!.long_name,
            country: addressComponents!.find((a: AddressComponent) => a.types.includes(AddressType.country))!.long_name,
        })

    }

}