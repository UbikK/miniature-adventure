import { Address, IInformationService, PointOfInterest, PointOfInterestDto } from 'domain';
import { AddressComponent, AddressType, Place, PlaceAutocompleteResponseData, PlaceDetailsResponseData, Status } from 'maps';
import { load } from "std/dotenv/mod.ts";
const env = await load();
export default class GoogleService implements IInformationService {
    private readonly DETAILS_API_URL = 'https://maps.googleapis.com/maps/api/place/details/json';
    private readonly AUTOCOMPLETE_API_URL = "https://maps.googleapis.com/maps/api/place/autocomplete/json"
    constructor() {}

    getPredictions = async (input: string, coords: string) => {
        const url = `${this.AUTOCOMPLETE_API_URL}?key=${Deno.env.get('GOOGLE_MAPS_API_KEY')?? env['GOOGLE_MAPS_API_KEY']}&input=${input}&location=${coords}&radius=1000&origin=${coords}&language=fr&types=establishment`;

        const response = await fetch(url);
        const body: PlaceAutocompleteResponseData = await response.json();

        if (body.status !== Status.OK) {
            console.error(body.status)
            return [];
        }

        const results = await Promise.all(body.predictions.map(this.getPointOfInterestInformations));
        return results.filter(p => !!p).map(i => i?.dto) as PointOfInterestDto[];
    }
    private getPointOfInterestInformations = async (place: Place): Promise<PointOfInterest | undefined> => {

        const url = `${this.DETAILS_API_URL}?place_id=${place.place_id!}&fields=address_components,geometry/location,name,photo&language=fr&key=${Deno.env.get('GOOGLE_MAPS_API_KEY') ?? env['GOOGLE_MAPS_API_KEY']}`

        const response = await fetch(url);

        const detailsResponse: PlaceDetailsResponseData  = await response.json();
    
        if (detailsResponse.status !== Status.OK) {
            console.error(detailsResponse.status);
            return;
        }

        const placeData = detailsResponse.result
        console.info(placeData.place_id)
        const addressComponents = placeData.address_components;

        const address = new Address({
            street: `${addressComponents!.find((a: AddressComponent) => a.types.includes(AddressType.street_number))?.long_name} ${addressComponents!.find((a: AddressComponent) => a.types.includes(AddressType.route))?.long_name}`,
            zipcode: addressComponents!.find((a: AddressComponent) => a.types.includes(AddressType.postal_code))!.long_name,
            city: addressComponents!.find((a: AddressComponent) => a.types.includes(AddressType.locality))!.long_name ?? addressComponents!.find((a: AddressComponent) => a.types.includes(AddressType.administrative_area_level_2))!.long_name,
            country: addressComponents!.find((a: AddressComponent) => a.types.includes(AddressType.country))!.long_name,
        });
        const poi = new PointOfInterest({...placeData, place_id: place.place_id, coordinates: `${placeData.geometry?.location.lat}, ${placeData.geometry?.location.lng}`})
        poi.setAddress(address);

        if (detailsResponse.result.photos && detailsResponse.result.photos[0]) {
            poi.photo_id = detailsResponse.result.photos[0].photo_reference;
        }
       
        return poi;
    }

}